import { z } from 'zod';

export const integrationProviderSchema = z.enum(['QuickBooks', 'Zoho']);

export const integrationConnectionSchema = z.object({
  _id: z.string().optional(),
  orgId: z.string(),
  provider: integrationProviderSchema,
  status: z.enum(['connected', 'disconnected', 'error']).default('disconnected'),
  authPayload: z.record(z.string()),
  lastSyncAt: z.string().datetime().optional(),
  errorMessage: z.string().optional(),
  createdAt: z.date().or(z.string().datetime()).optional(),
  updatedAt: z.date().or(z.string().datetime()).optional(),
});

export type IntegrationConnection = z.infer<typeof integrationConnectionSchema>;
