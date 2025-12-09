import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';

import { heliosSchema } from './schema';
import {
  ChecklistItem,
  InventoryItem,
  Job,
  PlanogramCell,
  SyncQueueItem,
} from './models';

export type DatabasePlatform = 'native' | 'web';

export type CreateDatabaseOptions = {
  platform?: DatabasePlatform;
  schemaVersion?: number;
};

const modelClasses = [Job, ChecklistItem, PlanogramCell, InventoryItem, SyncQueueItem];

const createNativeAdapter = (schemaVersion?: number) =>
  new SQLiteAdapter({
    schema: heliosSchema,
    schemaVersion: schemaVersion ?? heliosSchema.version,
    jsi: true,
    onSetUpError: (error) => {
      console.error('Failed to set up WatermelonDB', error);
    },
  });

const createWebAdapter = () =>
  new LokiJSAdapter({
    schema: heliosSchema,
    useWebWorker: false,
  });

export const createDatabase = (options: CreateDatabaseOptions = {}) => {
  const platform: DatabasePlatform = options.platform ?? 'native';
  const adapter = platform === 'web' ? createWebAdapter() : createNativeAdapter(options.schemaVersion);

  return new Database({
    adapter,
    modelClasses,
  });
};
