import { z } from 'zod';

export const organizationSchema = z.object({
  _id: z.string(),
  name: z.string(),
  settings: z.record(z.any()).default({}),
  featureFlags: z.record(z.boolean()).default({}),
  createdAt: z.date().or(z.number().transform((val) => new Date(val))),
  updatedAt: z.date().or(z.number().transform((val) => new Date(val))),
});

export type Organization = z.infer<typeof organizationSchema>;
