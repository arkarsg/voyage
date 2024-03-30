import React from 'react';
import { useSession } from './providers/SessionProvider';
import { Redirect, Slot } from 'expo-router';
import LoadingScreen from './components/LoadingScreen';

export default function SignIn(): React.JSX.Element {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (session === null) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
}
