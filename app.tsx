import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import RootLayout from './app/_layout';
import { Colors } from './lib/colors';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <RootLayout />
      </View>
    </GestureHandlerRootView>
  );
}
