import { useEffect, useState } from 'react';
import { getAuth as getFirebaseAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../config/firebase';
import type { User } from 'firebase/auth';

const firebaseAuth = getFirebaseAuth(app);

export function useAuthentication(): { firebaseUser: User | undefined } {
  const [firebaseUser, setFirebaseUser] = useState<User>();

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (firebaseUser !== null) {
        setFirebaseUser(firebaseUser);
      } else {
        setFirebaseUser(undefined);
      }
    });
    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    firebaseUser,
  };
}
