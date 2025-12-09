import { Model } from '@nozbe/watermelondb';
import { date, field, json } from '@nozbe/watermelondb/decorators';

export type JobPayload = {
  priority?: string;
  checklistVersion?: number;
  planogramVersion?: number;
  meta?: Record<string, unknown>;
};

export class Job extends Model {
  static table = 'jobs';

  @field('job_id') jobId!: string;
  @field('client_name') clientName!: string;
  @field('service_location') serviceLocation?: string;
  @field('status') status!: string;
  @field('scheduled_start') scheduledStart?: number;
  @field('scheduled_end') scheduledEnd?: number;
  @field('offline_version') offlineVersion?: number;

  @json('payload', (payload) => payload)
  payload!: JobPayload;

  @date('updated_at') updatedAt!: Date;
}
