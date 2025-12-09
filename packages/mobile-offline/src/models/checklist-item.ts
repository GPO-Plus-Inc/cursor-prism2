import { Model } from '@nozbe/watermelondb';
import { date, field, json } from '@nozbe/watermelondb/decorators';

export type ChecklistEvidence = {
  photos?: string[];
  signatureId?: string;
  notes?: string;
};

export class ChecklistItem extends Model {
  static table = 'checklist_items';

  @field('job_id') jobId!: string;
  @field('item_id') itemId!: string;
  @field('label') label!: string;
  @field('type') type!: string;
  @field('required') required!: boolean;
  @field('value') value?: string;

  @json('evidence', (value) => value)
  evidence?: ChecklistEvidence;

  @date('updated_at') updatedAt!: Date;
}
