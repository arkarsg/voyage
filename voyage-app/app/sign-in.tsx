import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'tamagui';
import { router } from 'expo-router';

import { useSession } from './providers/SessionProvider';
import { useAuth, AuthOperationName, useApp } from '@realm/react';

export default function SignIn(): React.JSX.Element {
  const { signIn } = useSession();
  const { result, logInWithJWT } = useAuth(); // eslint-disable-line @typescript-eslint/unbound-method
  const app = useApp();

  useEffect(() => {
    if (app.currentUser && result.success && result.operation === AuthOperationName.LogInWithJWT) {
      router.replace('/');
    }
  }, [result, router, app]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        color="green"
        onPress={async () => {
          await signIn().then((token) => {
            if (token !== null || token !== undefined) {
              try {
                logInWithJWT(token);
              } catch (err) {
                console.log(err);
              }
            }
          });
        }}
      >
        Sign In with Google
      </Button>
    </View>
  );
}
