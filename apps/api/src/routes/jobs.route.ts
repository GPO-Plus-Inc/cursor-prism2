import { Router } from 'express';

import { getDispatchBoardJobs, persistJobAndQueueSync } from '../modules/jobs/job.service';
import { jobSchema } from '../modules/jobs/job.types';

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

jobsRouter.post('/', async (req, res, next) => {
  try {
    const payload = jobSchema.parse(req.body);
    const saved = await persistJobAndQueueSync(payload);
    res.status(201).json({ job: saved });
  } catch (error) {
    next(error);
  }
});
