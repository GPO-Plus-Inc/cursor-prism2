import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const HELIOS_SCHEMA_VERSION = 1;

export const heliosSchema = appSchema({
  version: HELIOS_SCHEMA_VERSION,
  tables: [
    tableSchema({
      name: 'jobs',
      columns: [
        { name: 'job_id', type: 'string', isIndexed: true },
        { name: 'client_name', type: 'string' },
        { name: 'service_location', type: 'string', isOptional: true },
        { name: 'status', type: 'string' },
        { name: 'scheduled_start', type: 'number', isOptional: true },
        { name: 'scheduled_end', type: 'number', isOptional: true },
        { name: 'payload', type: 'string' },
        { name: 'offline_version', type: 'number', isOptional: true },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'checklist_items',
      columns: [
        { name: 'job_id', type: 'string', isIndexed: true },
        { name: 'item_id', type: 'string', isIndexed: true },
        { name: 'label', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'required', type: 'boolean' },
        { name: 'value', type: 'string', isOptional: true },
        { name: 'evidence', type: 'string', isOptional: true },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'planogram_cells',
      columns: [
        { name: 'job_id', type: 'string', isIndexed: true },
        { name: 'cell_key', type: 'string', isIndexed: true },
        { name: 'inventory_item_id', type: 'string', isOptional: true },
        { name: 'required_qty', type: 'number', isOptional: true },
        { name: 'actual_qty', type: 'number', isOptional: true },
        { name: 'status', type: 'string', isOptional: true },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'inventory_items',
      columns: [
        { name: 'inventory_item_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'sku', type: 'string', isOptional: true },
        { name: 'barcode', type: 'string', isOptional: true },
        { name: 'payload', type: 'string' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'sync_queue',
      columns: [
        { name: 'operation_id', type: 'string', isIndexed: true },
        { name: 'entity', type: 'string' },
        { name: 'action', type: 'string' },
        { name: 'payload', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'retry_count', type: 'number' },
        { name: 'last_error', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
