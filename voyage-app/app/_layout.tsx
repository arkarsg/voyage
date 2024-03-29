import { Logs } from 'expo';
import React from 'react';
import { Slot } from 'expo-router';
import VoyageProviders from './providers';

Logs.enableExpoCliLogging();

export default function Root(): React.JSX.Element {
  return (
    <VoyageProviders>
      <Slot />
    </VoyageProviders>
  );
}
