import React from 'react';
import { View } from 'react-native';
import RootLayout from './app/_layout';
import { Colors } from './lib/colors';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <RootLayout />
    </View>
  );
}
