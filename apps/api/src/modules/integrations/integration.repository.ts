import { Filter } from 'mongodb';

import { getCollection } from '../../config/mongo';
import {
  IntegrationConnection,
  integrationConnectionSchema,
  integrationProviderSchema,
} from './integration.types';

const COLLECTION = 'integration_connections';

export const upsertIntegrationConnection = async (connection: IntegrationConnection) => {
  const parsed = integrationConnectionSchema.parse(connection);
  const collection = await getCollection<IntegrationConnection>(COLLECTION);
  await collection.updateOne(
    { orgId: parsed.orgId, provider: parsed.provider } as Filter<IntegrationConnection>,
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

export const findIntegrationConnection = async (orgId: string, provider: typeof integrationProviderSchema._type) => {
  const collection = await getCollection<IntegrationConnection>(COLLECTION);
  const doc = await collection.findOne({ orgId, provider } as Filter<IntegrationConnection>);
  return doc ? integrationConnectionSchema.parse(doc) : null;
};
