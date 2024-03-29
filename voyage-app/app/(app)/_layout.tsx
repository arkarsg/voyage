import React, { useState, useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '../providers/SessionProvider';
import LoadingScreen from '../components/LoadingScreen';

export default function AppLayout(): React.JSX.Element {
  const { session, isLoading } = useSession();
  const [delayComplete, setDelayComplete] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDelayComplete(true);
    }, 200);
    return () => {
      clearTimeout(delay);
    };
  }, []);

  if (isLoading || !delayComplete) {
    return <LoadingScreen />;
  }

  if (session === null) {
    return <Redirect href="/sign-in" />;
  }
  return <Stack />;
}
