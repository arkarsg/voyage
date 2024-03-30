import React from 'react';
import { useSession } from './providers/SessionProvider';
import { Redirect } from 'expo-router';
import LoadingScreen from './components/LoadingScreen';

export default function SignIn(): React.JSX.Element {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (session === null || session === undefined) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Redirect href="/(app)/home" />;
}
