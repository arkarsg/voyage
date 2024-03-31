import React from 'react';
import { View, Text } from 'react-native';
import { useSession } from '../../providers/SessionProvider';
import { useUser } from '@realm/react';

export default function Tab(): React.JSX.Element {
  const { session, signOut } = useSession();
  const user = useUser();

  const logOutRealmAndGoogle = async (): Promise<void> => {
    await signOut().then(async () => {
      await user.logOut();
    });
  };
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>{user.profile.email}</Text>
      <Text>{session}</Text>
      <Text onPress={logOutRealmAndGoogle}>test</Text>
    </View>
  );
}
