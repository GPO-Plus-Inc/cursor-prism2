import { createSyncWorker } from '../queues/sync.queue';

const worker = createSyncWorker(async (job) => {
  switch (job.type) {
    case 'export':
      console.log('Running export job', job.payload);
      break;
    case 'integration-sync':
      console.log('Running integration sync', job.payload);
      break;
    case 'gps-backfill':
      console.log('Running GPS backfill', job.payload);
      break;
    default:
      console.warn('Unknown job type', job);
  }
});

worker.on('failed', (job, error) => {
  console.error('Background job failed', job?.name, error);
});
