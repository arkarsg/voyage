import React from 'react';
import { AppProvider } from '@realm/react';
import { SessionProvider } from './SessionProvider';
import { SYNC_CONFIG } from '../../sync.config';

const VoyageProviders = (props: React.PropsWithChildren): React.JSX.Element => {
  return (
    <AppProvider id={SYNC_CONFIG.appId}>
      <SessionProvider>{props.children}</SessionProvider>
    </AppProvider>
  );
};

export default VoyageProviders;
