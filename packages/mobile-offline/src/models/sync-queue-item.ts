import { Model } from '@nozbe/watermelondb';
import { date, field, json } from '@nozbe/watermelondb/decorators';

export type SyncAction = 'create' | 'update' | 'delete';
export type SyncStatus = 'pending' | 'syncing' | 'failed';

export type SyncPayload = Record<string, unknown>;

export class SyncQueueItem extends Model {
  static table = 'sync_queue';

  @field('operation_id') operationId!: string;
  @field('entity') entity!: string;
  @field('action') action!: SyncAction;
  @field('status') status!: SyncStatus;
  @field('retry_count') retryCount!: number;
  @field('last_error') lastError?: string;

  @json('payload', (value) => value)
  payload!: SyncPayload;

  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}
