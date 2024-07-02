import React from 'react';
import { Tabs } from 'expo-router';
import TripPopover from '@components/ui/TripPopover';

export default function TabLayout(): React.JSX.Element {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerRight: () => <TripPopover />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Your Trips',
        }}
      />
    </Tabs>
  );
}
