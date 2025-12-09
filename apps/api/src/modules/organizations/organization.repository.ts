import { Filter, WithId } from 'mongodb';

import { getCollection } from '../../config/mongo';
import { Organization, organizationSchema } from './organization.types';

const COLLECTION = 'organizations';

export const findOrganizationById = async (id: string) => {
  const collection = await getCollection<Organization>(COLLECTION);
  const doc = await collection.findOne({ _id: id } as Filter<Organization>);
  return doc ? organizationSchema.parse(doc) : null;
};

export const upsertOrganization = async (org: Organization) => {
  const parsed = organizationSchema.parse(org);
  const collection = await getCollection<Organization>(COLLECTION);
  await collection.updateOne(
    { _id: parsed._id } as Filter<Organization>,
    {
      $set: {
        ...parsed,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );

  return parsed;
};

export const listOrganizations = async () => {
  const collection = await getCollection<Organization>(COLLECTION);
  const docs = await collection.find().limit(50).toArray();
  return docs.map((doc) => organizationSchema.parse(doc as WithId<Organization>));
};
