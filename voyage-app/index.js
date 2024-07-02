import 'react-native-get-random-values';
import React from 'react';
import { registerRootComponent } from 'expo';
import { FirebaseApp } from './app/FirebaseApp';

const App = () => <FirebaseApp />;

registerRootComponent(App);
