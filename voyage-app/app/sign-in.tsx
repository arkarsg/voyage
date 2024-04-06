import React, { useEffect } from 'react';
import { Button, YStack, H1 } from 'tamagui';
import { router } from 'expo-router';

import { useSession } from './providers/SessionProvider';
import { useAuth, AuthOperationName, useApp } from '@realm/react';

export default function SignIn(): React.JSX.Element {
  const { signIn } = useSession();
  const { result, logInWithJWT } = useAuth(); // eslint-disable-line @typescript-eslint/unbound-method
  const app = useApp();

  const handleSignIn = async (): Promise<void> => {
    await signIn().then((token) => {
      if (token !== null || token !== undefined) {
        try {
          logInWithJWT(token);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  useEffect(() => {
    if (app.currentUser && result.success && result.operation === AuthOperationName.LogInWithJWT) {
      router.replace('/');
    }
  }, [result, router, app]);

  return (
    <YStack
      fullscreen
      alignItems="center"
      justifyContent="space-evenly"
      paddingTop="auto"
      paddingBottom="auto"
    >
      <H1 alignSelf="center">Voyage</H1>
      <Button themeInverse onPress={handleSignIn} borderRadius="$6">
        Sign In with Google
      </Button>
    </YStack>
  );
}
