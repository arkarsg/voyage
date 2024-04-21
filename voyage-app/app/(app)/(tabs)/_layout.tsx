import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout(): React.JSX.Element {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
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