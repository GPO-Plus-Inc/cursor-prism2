import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import env from './config/env';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
import { tenantContext } from './middleware/tenant-context';
import { healthRouter } from './routes/health.route';
import { statusRouter } from './routes/status.route';
import { jobsRouter } from './routes/jobs.route';
import { inventoryRouter } from './routes/inventory.route';
import { integrationsRouter } from './routes/integrations.route';

export const buildApp = () => {
  const app = express();

  app.set('trust proxy', true);

  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.use(tenantContext);

  app.use('/health', healthRouter);
  app.use('/api/v1/status', statusRouter);
  app.use('/api/v1/jobs', jobsRouter);
  app.use('/api/v1/inventory', inventoryRouter);
  app.use('/api/v1/integrations', integrationsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
