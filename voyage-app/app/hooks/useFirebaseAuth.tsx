import FirebaseAuth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface IFirebaseHook {
  signinWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const auth = FirebaseAuth();

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_FIREBASE_CLIENT_ID,
});

const useFirebase = (): IFirebaseHook => {
  const signinWithGoogle = async (): Promise<void> => {
    const user = await GoogleSignin.signIn();
    const idToken = user.idToken;

    if (idToken === null) {
      return;
    }

    const credential = FirebaseAuth.GoogleAuthProvider.credential(idToken);
    await auth.signInWithCredential(credential);
  };

  const signOut = async (): Promise<void> => {
    await auth.signOut();
  };

  return { signinWithGoogle, signOut };
};

export default useFirebase;
