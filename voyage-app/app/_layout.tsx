import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { Slot, SplashScreen } from 'expo-router';
import { Logs } from 'expo';
import { useFonts } from 'expo-font';

import VoyageProviders from './providers';
import { UserProvider } from '@realm/react';

import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

import LoadingScreen from './components/LoadingScreen';

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
          <RootLayoutNav />
        </UserProvider>
      </VoyageProviders>
    </TamaguiProvider>
  );
}

function RootLayoutNav(): React.JSX.Element {
  return <Slot />;
}
