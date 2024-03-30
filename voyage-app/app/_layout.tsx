import { Logs } from 'expo';
import React from 'react';
import { Slot } from 'expo-router';
import VoyageProviders from './providers';

Logs.enableExpoCliLogging();

export default function RootLayout(): React.JSX.Element {
  return (
    <VoyageProviders>
      <Slot />
    </VoyageProviders>
  );
}
