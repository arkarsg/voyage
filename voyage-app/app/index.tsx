import React from 'react';
import { useSession } from './providers/SessionProvider';
import { Redirect } from 'expo-router';
import LoadingScreen from './components/LoadingScreen';

export default function Root(): React.JSX.Element {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return session === null || session === undefined ? (
    <Redirect href="/(auth)/sign-in" />
  ) : (
    <Redirect href="/(app)/home" />
  );
}
