// eslint-disable
import 'expo-dev-client';
import 'react-native-get-random-values';
import React from 'react';
import { registerRootComponent } from 'expo';
import { AppWrapperNonSync } from './app/AppWrapperNonSync';
import { AppWrapperSync } from './app/AppWrapperSync';
import { SYNC_CONFIG } from './sync.config';
import { FirebaseApp } from './app/FirebaseApp';

const App = () => (SYNC_CONFIG.enabled ? <FirebaseApp /> : <AppWrapperNonSync />);

registerRootComponent(App);
