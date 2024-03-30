import React from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import FirebaseAuth from '@react-native-firebase/auth';
import { useSession } from '../providers/SessionProvider';
import { useAuth } from '@realm/react';

const auth = FirebaseAuth();

export default function SignIn(): React.JSX.Element {
  const { signIn } = useSession();
  const { logInWithJWT } = useAuth();

  const getJWTToken = async (): Promise<string | undefined> => {
    const token = await auth.currentUser?.getIdToken(true);
    console.log(token);
    return token;
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    await signIn().then(async () => {
      const token = await getJWTToken();
      logInWithJWT(token);
      router.replace('/');
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={async () => {
          await signIn().then(async () => {
            const token = await getJWTToken();
            logInWithJWT(token);
            router.replace('/');
          });
        }}
      >
        Sign In with Google
      </Text>
    </View>
  );
}
