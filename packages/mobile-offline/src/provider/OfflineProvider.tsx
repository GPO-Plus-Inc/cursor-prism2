import React, { PropsWithChildren, useMemo } from 'react';
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider';

import { createDatabase } from '../database';

export type OfflineProviderProps = PropsWithChildren<{ platform?: 'native' | 'web' }>;

export const OfflineProvider = ({ children, platform = 'native' }: OfflineProviderProps) => {
  const database = useMemo(() => createDatabase({ platform }), [platform]);

  return <DatabaseProvider database={database}>{children}</DatabaseProvider>;
};
