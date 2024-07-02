import { type FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface IAuthContext {
  signIn: () => Promise<string | null>;
  signOut: () => Promise<void>;
  getUser: () => FirebaseAuthTypes.User | null;
  session?: string | null;
  isLoading: boolean;
}
