import { Router } from 'express';

export const statusRouter = Router();

statusRouter.get('/', (req, res) => {
  res.json({
    message: 'Helios FSM API ready',
    offlineQueue: 'enabled',
    multiTenant: true,
    orgContext: req.orgContext ?? null,
  });
});
