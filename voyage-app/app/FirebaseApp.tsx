import React from 'react';
import { useAuthentication } from './utils/hooks/useFirebaseAuth';
import { SYNC_CONFIG } from '../sync.config';
import { AppSync } from './AppSync';
import { AppWrapperSync } from '../app/AppWrapperSync';

export const FirebaseApp: React.FC | React.ReactElement = () => {
  const { firebaseUser } = useAuthentication();

  return firebaseUser !== undefined ? <AppSync /> : <AppWrapperSync appId={SYNC_CONFIG.appId} />;
};
