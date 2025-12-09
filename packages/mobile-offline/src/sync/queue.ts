import { Database, Q } from '@nozbe/watermelondb';
import { v4 as uuid } from 'uuid';

import { SyncAction, SyncQueueItem, SyncStatus, SyncPayload } from '../models/sync-queue-item';

export type QueueItemInput = {
  entity: string;
  action: SyncAction;
  payload: SyncPayload;
};

export const enqueueOperation = async (database: Database, input: QueueItemInput) => {
  const operationId = uuid();

  await database.write(async () => {
    await database.collections.get<SyncQueueItem>('sync_queue').create((record) => {
      record._raw.operation_id = operationId;
      record._raw.entity = input.entity;
      record._raw.action = input.action;
      record._raw.payload = JSON.stringify(input.payload);
      record._raw.status = 'pending' satisfies SyncStatus;
      record._raw.retry_count = 0;
      const timestamp = Date.now();
      record._raw.created_at = timestamp;
      record._raw.updated_at = timestamp;
    });
  });

  return operationId;
};

export const markOperationStatus = async (
  database: Database,
  operationId: string,
  status: SyncStatus,
  lastError?: string,
) => {
  const collection = database.collections.get<SyncQueueItem>('sync_queue');
  const [existing] = await collection.query(Q.where('operation_id', operationId)).fetch();

  if (!existing) {
    return;
  }

  await database.write(async () => {
    await existing.update((node) => {
      node._raw.status = status;
      node._raw.retry_count = status === 'failed' ? node.retryCount + 1 : node.retryCount;
      node._raw.last_error = lastError;
      node._raw.updated_at = Date.now();
    });
  });
};
