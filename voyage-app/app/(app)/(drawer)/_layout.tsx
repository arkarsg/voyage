import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export default function Layout(): React.JSX.Element {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    />
  );
}

const CustomDrawerContent = (props): React.JSX.Element => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={'Profile'} />
      <DrawerItem label={'Trips'} />
    </DrawerContentScrollView>
  );
};
