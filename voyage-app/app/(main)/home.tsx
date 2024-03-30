import React from 'react';
import { Text, View } from 'react-native';
import { useSession } from '../providers/SessionProvider';

export default function App(): React.JSX.Element {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          void signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
