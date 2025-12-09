import { Queue, Worker, QueueEvents, JobsOptions } from 'bullmq';

import { getRedisUrl, redisOptions } from '../config/redis';

export type BackgroundJob = {
  type: 'export' | 'integration-sync' | 'gps-backfill';
  payload: Record<string, unknown>;
};

const connection = { ...redisOptions, connectionName: 'helios-fsm-queue', url: getRedisUrl() } as const;

export const syncQueue = new Queue<BackgroundJob>('helios-sync', { connection });
export const syncQueueEvents = new QueueEvents('helios-sync', { connection });

export const enqueueJob = async (job: BackgroundJob, options?: JobsOptions) => {
  await syncQueue.add(job.type, job, {
    attempts: 5,
    backoff: { type: 'exponential', delay: 3000 },
    removeOnComplete: 100,
    removeOnFail: 500,
    ...options,
  });
};

export const createSyncWorker = (handler: (job: BackgroundJob) => Promise<void>) =>
  new Worker<BackgroundJob>(
    'helios-sync',
    async (job) => {
      await handler(job.data);
    },
    { connection },
  );
