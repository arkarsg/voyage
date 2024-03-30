import React from 'react';
import { AppProvider, UserProvider } from '@realm/react';
import { SessionProvider } from './SessionProvider';
import { SYNC_CONFIG } from '../../sync.config';
import { Slot } from 'expo-router';

const VoyageProviders = (props: React.PropsWithChildren): React.JSX.Element => {
  return (
    <AppProvider id={SYNC_CONFIG.appId}>
      <UserProvider fallback={<Slot />}>
        <SessionProvider>{props.children}</SessionProvider>
      </UserProvider>
    </AppProvider>
  );
};

export default VoyageProviders;
