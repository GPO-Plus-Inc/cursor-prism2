import axios from 'axios';

import { IntegrationConnection } from '../modules/integrations/integration.types';

const ZOHO_BASE = 'https://www.zohoapis.com/crm/v4';

export const createZohoClient = (connection: IntegrationConnection) => {
  const token = connection.authPayload.accessToken;
  const instance = axios.create({
    baseURL: ZOHO_BASE,
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return instance;
};

export const syncZohoClients = async (connection: IntegrationConnection) => {
  const client = createZohoClient(connection);
  const response = await client.get('/Accounts');
  return response.data;
};
