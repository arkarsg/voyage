import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '../providers/SessionProvider';
import LoadingScreen from '../components/LoadingScreen';

export default function AppLayout(): React.JSX.Element {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (session === null) {
    return <Redirect href="/sign-in" />;
  }
  return <Stack />;
}
