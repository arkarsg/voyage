import React from 'react';

import { useSession } from '@providers/SessionProvider';
import { useUser } from '@realm/react';

import { YStack, Button } from 'tamagui';
import UserCard from '@components/ui/UserCard';

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
    <YStack padding="$4" fullscreen flex={1}>
      <UserCard
        user={{
          displayName: voyageUser?.displayName,
          email: voyageUser?.email,
          photoURL: voyageUser?.photoURL,
        }}
      />
      <Button
        borderRadius="$6"
        onPress={logOutRealmAndGoogle}
        theme="red"
        position="absolute"
        bottom={10}
        alignSelf="center"
        width={'100%'}
      >
        Log out
      </Button>
    </YStack>
  );
}
