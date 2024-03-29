import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const LoadingScreen = (): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="small" color="#4d4d4d" />
      </View>
    </SafeAreaProvider>
  );
};

export default LoadingScreen;
