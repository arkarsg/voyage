import React, { createContext, useContext } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import FirebaseAuth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import type { IAuthContext } from '../types';

const auth = FirebaseAuth();

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_FIREBASE_CLIENT_ID,
});

const AuthContext = createContext<IAuthContext>({
  signIn: async () => '',
  signOut: async () => {},
  session: null,
  isLoading: false,
});

export function useSession(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export function SessionProvider(props: React.PropsWithChildren): React.JSX.Element {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (): Promise<string> => {
          try {
            const token = await GoogleSignin.signIn()
              .then(async (data) => {
                const credential = FirebaseAuth.GoogleAuthProvider.credential(data.idToken);
                setSession(credential.token);
                return await auth.signInWithCredential(credential);
              })
              .then(async (user) => {
                return await user.user.getIdToken(false);
              });

            return token;
          } catch (err) {
            console.log(err);
            throw new Error('Failed to sign in'); // Throw an error if signIn fails
          }
        },
        signOut: async (): Promise<void> => {
          await auth.signOut();
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
