// eslint-disable
import 'expo-dev-client';
import 'react-native-get-random-values';
import React from 'react';
import { registerRootComponent } from 'expo';
import RootLayout from './_layout';

const App = (): React.JSX.Element => <RootLayout />;

registerRootComponent(App);
