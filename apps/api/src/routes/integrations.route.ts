import { Router } from 'express';
import { z } from 'zod';

import { enqueueJob } from '../queues/sync.queue';
import { findIntegrationConnection, upsertIntegrationConnection } from '../modules/integrations/integration.repository';

export const integrationsRouter = Router();

const integrationBodySchema = z.object({
  provider: z.enum(['QuickBooks', 'Zoho']),
  authPayload: z.record(z.string()),
});

integrationsRouter.get('/:provider', async (req, res, next) => {
  try {
    const orgId = req.orgContext?.orgId;
    const provider = req.params.provider as 'QuickBooks' | 'Zoho';
    if (!orgId) {
      return res.status(400).json({ error: 'missing_org_id' });
    }
    const connection = await findIntegrationConnection(orgId, provider);
    res.json({ connection });
  } catch (error) {
    next(error);
  }
});

integrationsRouter.post('/', async (req, res, next) => {
  try {
    const orgId = req.orgContext?.orgId;
    if (!orgId) {
      return res.status(400).json({ error: 'missing_org_id' });
    }
    const payload = integrationBodySchema.parse(req.body);
    const connection = await upsertIntegrationConnection({
      orgId,
      provider: payload.provider,
      authPayload: payload.authPayload,
      status: 'connected',
      updatedAt: new Date().toISOString(),
    });

    await enqueueJob({
      type: 'integration-sync',
      payload: { provider: payload.provider, orgId },
    });

    res.status(201).json({ connection });
  } catch (error) {
    next(error);
  }
});
