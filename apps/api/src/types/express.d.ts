import type { OrgContext } from './org-context';

declare global {
  namespace Express {
    interface Request {
      orgContext?: OrgContext;
      requestId?: string;
    }
  }
}

export {};
