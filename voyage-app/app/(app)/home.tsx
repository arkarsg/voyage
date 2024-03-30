import React from 'react';
import { Text, View } from 'react-native';
import { useSession } from '../providers/SessionProvider';
import { router } from 'expo-router';

export default function Index(): React.JSX.Element {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={async () => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          await signOut().then(() => {
            router.replace('/');
          });
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
