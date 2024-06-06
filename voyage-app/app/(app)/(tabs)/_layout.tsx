import React from 'react';
import { Tabs } from 'expo-router';
import VoyageHeaderButton from '@components/ui/VoyageHeaderButton';

export default function TabLayout(): React.JSX.Element {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerRight: () => <VoyageHeaderButton />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
