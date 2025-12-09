import { heliosSchema } from './schema';

describe('heliosSchema', () => {
  it('contains sync queue table', () => {
    const tables = Array.isArray(heliosSchema.tables)
      ? heliosSchema.tables
      : Object.values(heliosSchema.tables ?? {});
    const syncQueue = tables.find((tbl) => tbl.name === 'sync_queue');
    expect(syncQueue).toBeDefined();
    const columns = syncQueue
      ? Array.isArray(syncQueue.columns)
        ? syncQueue.columns
        : Object.values(syncQueue.columns ?? {})
      : [];
    expect(columns.some((column) => column.name === 'operation_id')).toBe(true);
  });
});
