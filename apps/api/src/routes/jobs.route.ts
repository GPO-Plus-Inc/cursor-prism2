import { Router } from 'express';
import { z } from 'zod';

import { getDispatchBoardJobs, persistJobAndQueueSync } from '../modules/jobs/job.service';

export const jobsRouter = Router();

jobsRouter.get('/', async (req, res, next) => {
  try {
    const orgId = req.orgContext?.orgId;
    if (!orgId) {
      return res.status(400).json({ error: 'missing_org_id' });
    }
    const jobs = await getDispatchBoardJobs(orgId);
    res.json({ jobs });
  } catch (error) {
    next(error);
  }
});

const upsertJobSchema = z.object({
  _id: z.string(),
  orgId: z.string(),
  jobTypeId: z.string(),
  clientId: z.string(),
  serviceLocationId: z.string(),
  status: z.string(),
  priority: z.string().optional(),
  scheduledStart: z.string().optional(),
  scheduledEnd: z.string().optional(),
  assignedUserIds: z.array(z.string()).optional(),
  updatedAt: z.string(),
});

jobsRouter.post('/', async (req, res, next) => {
  try {
    const payload = upsertJobSchema.parse(req.body);
    const saved = await persistJobAndQueueSync({
      ...payload,
      checklist: req.body.checklist,
      planogramResults: req.body.planogramResults,
      inventoryUsage: req.body.inventoryUsage,
    });
    res.status(201).json({ job: saved });
  } catch (error) {
    next(error);
  }
});
