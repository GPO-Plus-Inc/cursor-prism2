import { z } from 'zod';

export const inventoryItemSchema = z.object({
  _id: z.string(),
  orgId: z.string(),
  name: z.string(),
  sku: z.string().optional(),
  barcodeValue: z.string().optional(),
  unit: z.string().optional(),
  customFields: z.record(z.any()).default({}),
  stockLevel: z.number().optional(),
  updatedAt: z.string().datetime(),
});

export type InventoryRecord = z.infer<typeof inventoryItemSchema>;
