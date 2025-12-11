import { Filter } from 'mongodb';

import { getCollection } from '../../config/mongo';
import { InventoryRecord, inventoryItemSchema } from './inventory.types';

const COLLECTION = 'inventory_items';

export const findInventoryByOrg = async (orgId: string, search?: string) => {
  const collection = await getCollection<InventoryRecord>(COLLECTION);
  const query: Filter<InventoryRecord> = { orgId };
  if (search) {
    Object.assign(query, {
      name: { $regex: search, $options: 'i' },
    });
  }
  const docs = await collection.find(query).limit(50).toArray();
  return docs.map((doc) => inventoryItemSchema.parse(doc));
};

export const upsertInventoryItem = async (item: InventoryRecord) => {
  const parsed = inventoryItemSchema.parse(item);
  const collection = await getCollection<InventoryRecord>(COLLECTION);
  await collection.updateOne(
    { _id: parsed._id } as Filter<InventoryRecord>,
    { $set: { ...parsed, updatedAt: new Date(parsed.updatedAt).toISOString() } },
    { upsert: true },
  );
  return parsed;
};
