import { z } from 'zod';

export const jobSchema = z.object({
  _id: z.string(),
  orgId: z.string(),
  jobTypeId: z.string(),
  clientId: z.string(),
  serviceLocationId: z.string(),
  status: z.enum(['Draft', 'Scheduled', 'Dispatched', 'InProgress', 'Completed', 'Invoiced', 'Canceled']),
  priority: z.string().default('Normal'),
  scheduledStart: z.string().datetime().optional(),
  scheduledEnd: z.string().datetime().optional(),
  assignedUserIds: z.array(z.string()).default([]),
  checklist: z.any().optional(),
  planogramResults: z.any().optional(),
  inventoryUsage: z.any().optional(),
  offlineVersion: z.number().optional(),
  updatedAt: z.string().datetime(),
});

export type JobRecord = z.infer<typeof jobSchema>;
