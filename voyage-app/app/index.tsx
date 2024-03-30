import React from 'react';
import { useSession } from './providers/SessionProvider';
import { useApp } from '@realm/react';
import LoadingScreen from './components/LoadingScreen';
import { Redirect } from 'expo-router';

export default function Page(): React.JSX.Element {
  const { session, isLoading } = useSession();
  const app = useApp();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (session === null || app.currentUser === null) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  return <Redirect href="/(main)/home" />;
}
