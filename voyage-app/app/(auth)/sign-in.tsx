import React from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from '../providers/SessionProvider';
import { useAuth } from '@realm/react';

export default function SignIn(): React.JSX.Element {
  const { signIn } = useSession();
  const { result, logInWithJWT } = useAuth(); // eslint-disable-line @typescript-eslint/unbound-method

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={async () => {
          await signIn().then((token) => {
            if (token !== null || token !== undefined) {
              console.log(token);
              logInWithJWT(token);
              console.log(result.state);
            }
            router.replace('/');
          });
        }}
      >
        Sign In with Google
      </Text>
    </View>
  );
}
