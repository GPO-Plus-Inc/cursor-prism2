import { Model } from '@nozbe/watermelondb';
import { date, field, json } from '@nozbe/watermelondb/decorators';

export type InventoryPayload = {
  unit?: string;
  favorites?: boolean;
  customFields?: Record<string, unknown>;
};

export class InventoryItem extends Model {
  static table = 'inventory_items';

  @field('inventory_item_id') inventoryItemId!: string;
  @field('name') name!: string;
  @field('sku') sku?: string;
  @field('barcode') barcode?: string;

  @json('payload', (value) => value)
  payload!: InventoryPayload;

  @date('updated_at') updatedAt!: Date;
}
