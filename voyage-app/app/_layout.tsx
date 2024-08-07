import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { Logs } from 'expo';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';

import { RealmProvider, UserProvider } from '@realm/react';
import VoyageProviders from '@providers/index';

import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

import LoadingScreen from '@components/LoadingScreen';
import { Trip } from '@models/Trip';
import TripDestination from '@models/TripDestination';
import { TripProvider } from '@providers/TripProvider';

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
            schema={[Trip, TripDestination]}
            sync={{
              flexible: true,
              initialSubscriptions: {
                update: (mutableSubs, realm) => {
                  mutableSubs.add(realm.objects(Trip));
                },
              },
              onError: (error) => {
                console.error(error);
              },
            }}
          >
            <TripProvider>
              <RootLayoutNav />
            </TripProvider>
          </RealmProvider>
        </UserProvider>
      </VoyageProviders>
    </TamaguiProvider>
  );
}

function RootLayoutNav(): React.JSX.Element {
  return <Slot />;
}
