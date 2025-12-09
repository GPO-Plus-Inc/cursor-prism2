import { enqueueJob } from '../../queues/sync.queue';
import { findInventoryByOrg, upsertInventoryItem } from './inventory.repository';
import { InventoryRecord } from './inventory.types';

export const listInventory = async (orgId: string, search?: string) =>
  findInventoryByOrg(orgId, search);

export const saveInventoryItem = async (item: InventoryRecord) => {
  const saved = await upsertInventoryItem(item);
  await enqueueJob({ type: 'integration-sync', payload: { entity: 'inventory', id: saved._id } });
  return saved;
};
