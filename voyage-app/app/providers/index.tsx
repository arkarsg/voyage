import React from 'react';
import { FirebaseProvider } from './FirebaseContext';

interface IProps {
  children: React.ReactNode;
}

const Providers: React.FC<IProps> = ({ children }) => {
  return <FirebaseProvider>{children}</FirebaseProvider>;
};

export default Providers;
