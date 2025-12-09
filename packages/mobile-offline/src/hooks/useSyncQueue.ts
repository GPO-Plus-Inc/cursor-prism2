import { useDatabase } from '@nozbe/watermelondb/hooks';
import { useCallback, useEffect, useState } from 'react';

import { enqueueOperation, QueueItemInput } from '../sync/queue';
import { markOperationStatus } from '../sync/queue';
import { SyncStatus } from '../models';

export const useSyncQueue = () => {
  const database = useDatabase();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const collection = database.collections.get('sync_queue');
    const subscription = collection
      .query()
      .observeCount()
      .subscribe((count) => setPendingCount(count));

    return () => subscription.unsubscribe();
  }, [database]);

  const enqueue = useCallback(
    async (payload: QueueItemInput) => enqueueOperation(database, payload),
    [database],
  );

  const updateStatus = useCallback(
    async (operationId: string, status: SyncStatus, lastError?: string) =>
      markOperationStatus(database, operationId, status, lastError),
    [database],
  );

  return {
    pendingCount,
    enqueue,
    updateStatus,
  };
};
