import React from 'react';

import { useSession } from '../../providers/SessionProvider';
import { useUser } from '@realm/react';

import { YStack } from 'tamagui';
import UserCard from '../../components/ui/UserCard';
import { Calendar } from 'react-native-calendars';

export default function ProfileTab(): React.JSX.Element {
  const { getUser, signOut } = useSession();
  const voyageUser = getUser();
  const realmUser = useUser();

  const logOutRealmAndGoogle = async (): Promise<void> => {
    await signOut().then(async () => {
      await realmUser.logOut();
    });
  };

  return (
    <YStack padding="$4" fullscreen>
      <UserCard
        user={{
          displayName: voyageUser?.displayName,
          email: voyageUser?.email,
          photoURL: voyageUser?.photoURL,
        }}
        signOut={logOutRealmAndGoogle}
      />
      <Calendar
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
      />
    </YStack>
  );
}
