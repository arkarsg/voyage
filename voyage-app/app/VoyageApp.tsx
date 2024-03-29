import React from 'react';
import { Text } from 'react-native';
import { useApp } from '@realm/react';

export default function VoyageApp(): React.ReactElement {
  const realmApp = useApp();
  return realmApp.currentUser === null ? <Text>No user</Text> : <Text>Something is wrong</Text>;
}
