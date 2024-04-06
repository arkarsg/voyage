import { type FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface IUserCard {
  user: FirebaseAuthTypes.User;
  signOut: () => Promise<void>;
}
