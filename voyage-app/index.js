// eslint-disable
import 'expo-dev-client';
import 'react-native-get-random-values';
import React from 'react';
import { registerRootComponent } from 'expo';
import { RootLayout } from 'app/_layout';

const App = () => <RootLayout />;

registerRootComponent(App);
