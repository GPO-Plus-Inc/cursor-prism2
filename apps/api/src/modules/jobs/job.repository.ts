import { Filter } from 'mongodb';

import { getCollection } from '../../config/mongo';
import { jobSchema, JobRecord } from './job.types';

const COLLECTION = 'jobs';

export const listJobsByOrg = async (orgId: string, limit = 25) => {
  const collection = await getCollection<JobRecord>(COLLECTION);
  const docs = await collection
    .find({ orgId } as Filter<JobRecord>)
    .sort({ scheduledStart: 1 })
    .limit(limit)
    .toArray();
  return docs.map((doc) => jobSchema.parse(doc));
};

export const saveJob = async (job: JobRecord) => {
  const parsed = jobSchema.parse(job);
  const collection = await getCollection<JobRecord>(COLLECTION);
  await collection.updateOne(
    { _id: parsed._id } as Filter<JobRecord>,
    {
      $set: {
        ...parsed,
        updatedAt: new Date(parsed.updatedAt).toISOString(),
      },
    },
    { upsert: true },
  );
  return parsed;
};
