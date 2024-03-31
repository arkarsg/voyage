import { Logs } from 'expo';
import React from 'react';
import { Slot } from 'expo-router';
import VoyageProviders from './providers';
import { UserProvider } from '@realm/react';

Logs.enableExpoCliLogging();

export {
  // Catch any errors thrown by the Layout component.
  // Remove in prod
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout(): React.JSX.Element {
  return (
    <VoyageProviders>
      <UserProvider fallback={RootLayoutNav}>
        <RootLayoutNav />
      </UserProvider>
    </VoyageProviders>
  );
}

function RootLayoutNav(): React.JSX.Element {
  return <Slot />;
}
