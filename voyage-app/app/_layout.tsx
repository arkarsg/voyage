import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { Slot, SplashScreen } from 'expo-router';
import { Logs } from 'expo';
import { useFonts } from 'expo-font';

import VoyageProviders from './providers';
import { UserProvider, RealmProvider } from '@realm/react';
import { OpenRealmBehaviorType } from 'realm';

import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

import LoadingScreen from './components/LoadingScreen';
import { Trip } from './models/Trip';
import TripDestination from './models/TripDestination';

Logs.enableExpoCliLogging();

export {
  // Catch any errors thrown by the Layout component.
  // Remove in prod
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return <LoadingScreen />;
  }

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as string}>
      <VoyageProviders>
        <UserProvider fallback={RootLayoutNav}>
          <RealmProvider
            schema={[Trip]}
            sync={{
              flexible: true,
              initialSubscriptions: {
                update: (mutableSubs, realm) => {
                  mutableSubs.add(realm.objects(Trip));
                  mutableSubs.add(realm.objects(TripDestination));
                },
              },
              newRealmFileBehavior: {
                type: OpenRealmBehaviorType.DownloadBeforeOpen,
              },
              existingRealmFileBehavior: {
                type: OpenRealmBehaviorType.OpenImmediately,
              },
              onError: (error) => {
                console.error(error);
              },
            }}
          >
            <RootLayoutNav />
          </RealmProvider>
        </UserProvider>
      </VoyageProviders>
    </TamaguiProvider>
  );
}

function RootLayoutNav(): React.JSX.Element {
  return <Slot />;
}
