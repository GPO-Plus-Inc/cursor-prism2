import crypto from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

import type { OrgContext } from '../types/org-context';

const headerName = 'x-org-id';

export const tenantContext = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const orgIdFromHeader = req.header(headerName) ?? req.query.orgId;
  const orgContext: OrgContext = {
    orgId: typeof orgIdFromHeader === 'string' ? orgIdFromHeader : undefined,
    locale: (req.header('accept-language') ?? 'en-US').split(',')[0],
    requestId: crypto.randomUUID(),
  };

  req.orgContext = orgContext;
  req.requestId = orgContext.requestId;

  next();
};
