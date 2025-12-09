import NodeCache from 'node-cache';

import {
  findOrganizationById,
  listOrganizations,
  upsertOrganization,
} from './organization.repository';
import { Organization } from './organization.types';

const cache = new NodeCache({ stdTTL: 60 });

export const getOrganization = async (id: string) => {
  const cacheKey = `org:${id}`;
  const cached = cache.get<Organization>(cacheKey);
  if (cached) {
    return cached;
  }

  const organization = await findOrganizationById(id);
  if (organization) {
    cache.set(cacheKey, organization);
  }
  return organization;
};

export const saveOrganization = async (org: Organization) => {
  const saved = await upsertOrganization(org);
  cache.set(`org:${saved._id}`, saved);
  return saved;
};

export const listOrgSummaries = async () => listOrganizations();
