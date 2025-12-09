import { enqueueJob } from '../../queues/sync.queue';
import { JobRecord } from './job.types';
import { listJobsByOrg, saveJob } from './job.repository';

export const getDispatchBoardJobs = async (orgId: string) => listJobsByOrg(orgId, 100);

export const persistJobAndQueueSync = async (job: JobRecord) => {
  const saved = await saveJob(job);
  await enqueueJob({
    type: 'export',
    payload: {
      entity: 'job',
      jobId: saved._id,
      orgId: saved.orgId,
    },
  });
  return saved;
};
