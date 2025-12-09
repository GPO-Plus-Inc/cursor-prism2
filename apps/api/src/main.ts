/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

const app = express();
const buildVersion = process.env.GIT_SHA ?? 'local';

app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', version: buildVersion, timestamp: Date.now() });
});

app.get('/api/v1/status', (_req, res) => {
  res.json({
    message: 'Helios FSM API ready',
    offlineQueue: 'enabled',
    multiTenant: true,
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

server.on('error', (error) => {
  console.error('API server error', error);
});
