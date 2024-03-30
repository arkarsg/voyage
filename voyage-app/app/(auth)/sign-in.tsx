import React from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from '../providers/SessionProvider';

export default function SignIn(): React.JSX.Element {
  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={async () => {
          await signIn().then(() => {
            router.replace('/');
          });
        }}
      >
        Sign In with Google
      </Text>
    </View>
  );
}
