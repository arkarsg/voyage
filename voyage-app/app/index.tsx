import React from 'react';
import { AppProvider } from '@realm/react';
import { SYNC_CONFIG } from '../sync.config';
import VoyageApp from './VoyageApp';

const StartPage = (): React.JSX.Element => {
  return (
    <AppProvider id={SYNC_CONFIG.appId}>
      <VoyageApp />
    </AppProvider>
  );
};

export default StartPage;
