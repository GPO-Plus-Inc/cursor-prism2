import http from 'node:http';

import env from './config/env';
import { buildApp } from './app';

export const startServer = () => {
  const app = buildApp();
  const server = http.createServer(app);

  server.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`${env.serviceName} listening on :${env.port}`);
  });

  server.on('error', (error) => {
    // eslint-disable-next-line no-console
    console.error('API server error', error);
    process.exit(1);
  });

  return server;
};
