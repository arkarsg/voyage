import React, { createContext, useEffect, useState } from 'react';
import { getAuth as getFirebaseAuth } from 'firebase/auth';
import type { User } from 'firebase/auth';
import app from '../../config/firebase';

interface IProps {
  children: React.ReactNode;
}

const firebaseAuth = getFirebaseAuth(app);

export const FirebaseContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const FirebaseProvider: React.FC<IProps> = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const onAuthStateChanged = (user: User | null): void => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return <FirebaseContext.Provider value={{ user, setUser }}>{children}</FirebaseContext.Provider>;
};
