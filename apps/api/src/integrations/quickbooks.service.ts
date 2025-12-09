import axios from 'axios';

import { IntegrationConnection } from '../modules/integrations/integration.types';

const QUICKBOOKS_BASE = 'https://quickbooks.api.intuit.com';

export const createQuickBooksClient = (connection: IntegrationConnection) => {
  const token = connection.authPayload.accessToken;
  const realmId = connection.authPayload.realmId;
  const instance = axios.create({
    baseURL: `${QUICKBOOKS_BASE}/v3/company/${realmId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

export const syncQuickBooksInventory = async (connection: IntegrationConnection) => {
  const client = createQuickBooksClient(connection);
  const response = await client.get('/query', {
    params: {
      query: 'select * from Item where Metadata.LastUpdatedTime > ?'
        .replace('?', connection.lastSyncAt ?? '2020-01-01T00:00:00Z'),
    },
  });
  return response.data;
};
