import React, { createContext, useEffect, useState } from 'react';
import FirebaseAuth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';

interface IProps {
  children: React.ReactNode;
}

const firebaseAuth = FirebaseAuth();

export const FirebaseContext = createContext<{
  user: FirebaseAuthTypes.User | null;
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const FirebaseProvider: React.FC<IProps> = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null): void => {
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
