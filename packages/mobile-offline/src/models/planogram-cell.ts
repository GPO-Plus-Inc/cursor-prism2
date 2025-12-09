import { Model } from '@nozbe/watermelondb';
import { date, field } from '@nozbe/watermelondb/decorators';

export class PlanogramCell extends Model {
  static table = 'planogram_cells';

  @field('job_id') jobId!: string;
  @field('cell_key') cellKey!: string;
  @field('inventory_item_id') inventoryItemId?: string;
  @field('required_qty') requiredQty?: number;
  @field('actual_qty') actualQty?: number;
  @field('status') status?: string;
  @field('notes') notes?: string;

  @date('updated_at') updatedAt!: Date;
}
