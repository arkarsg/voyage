import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import UserCard from '@components/ui/UserCard';
import { useSession } from '@providers/SessionProvider';

export default function Layout(): React.JSX.Element {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    />
  );
}

const CustomDrawerContent = (props): React.JSX.Element => {
  const { getUser } = useSession();
  const voyageUser = getUser();

  return (
    <DrawerContentScrollView {...props}>
      <UserCard
        user={{
          displayName: voyageUser?.displayName,
          email: voyageUser?.email,
          photoURL: voyageUser?.photoURL,
        }}
      />
      <DrawerItem label={'Profile'} />
      <DrawerItem label={'Trips'} />
    </DrawerContentScrollView>
  );
};
