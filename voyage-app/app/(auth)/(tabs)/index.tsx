import React from 'react';
import { YStack } from 'tamagui';

import { useSession } from '../../providers/SessionProvider';
import { useUser } from '@realm/react';
import UserCard from '../../components/ui/UserCard';

export default function Tab(): React.JSX.Element {
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
      <UserCard user={voyageUser} signOut={logOutRealmAndGoogle} />
    </YStack>
  );
}
