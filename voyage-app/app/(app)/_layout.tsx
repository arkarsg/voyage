import LoadingScreen from '@components/LoadingScreen';
import { useSession } from '@providers/SessionProvider';
import { useApp } from '@realm/react';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function AppLayout(): React.JSX.Element {
  const { session, isLoading } = useSession();
  const app = useApp();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!session || !app.currentUser?.isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
