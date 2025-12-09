import { Router } from 'express';

import env from '../config/env';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: env.serviceName,
    version: process.env.GIT_SHA ?? 'local',
    timestamp: new Date().toISOString(),
  });
});
