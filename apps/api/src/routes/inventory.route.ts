import { Router } from 'express';
import { z } from 'zod';

import { listInventory, saveInventoryItem } from '../modules/inventory/inventory.service';

export const inventoryRouter = Router();

inventoryRouter.get('/', async (req, res, next) => {
  try {
    const orgId = req.orgContext?.orgId;
    if (!orgId) {
      return res.status(400).json({ error: 'missing_org_id' });
    }
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const items = await listInventory(orgId, search);
    res.json({ items });
  } catch (error) {
    next(error);
  }
});

const inventoryBodySchema = z.object({
  _id: z.string(),
  orgId: z.string(),
  name: z.string(),
  sku: z.string().optional(),
  barcodeValue: z.string().optional(),
  unit: z.string().optional(),
  customFields: z.record(z.any()).optional(),
  stockLevel: z.number().optional(),
  updatedAt: z.string(),
});

inventoryRouter.post('/', async (req, res, next) => {
  try {
    const payload = inventoryBodySchema.parse(req.body);
    const saved = await saveInventoryItem(payload);
    res.status(201).json({ item: saved });
  } catch (error) {
    next(error);
  }
});
