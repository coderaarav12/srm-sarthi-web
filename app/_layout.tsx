import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/lib/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    inter: require('../assets/inter.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors['muted-foreground'],
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: -8,
        },
      }}
    >
      <Tabs.Screen
        name="tabs/trains"
        options={{
          title: 'Trains',
          tabBarLabel: 'Trains',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="train" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tabs/buses"
        options={{
          title: 'Buses',
          tabBarLabel: 'Buses',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="directions-bus" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tabs/explore"
        options={{
          title: 'Explore',
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="map" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tabs/profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
