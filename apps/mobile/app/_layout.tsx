import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  Mukta_400Regular,
  Mukta_500Medium,
} from '@expo-google-fonts/mukta';
import {
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Mukta_400Regular,
    Mukta_500Medium,
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboard)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="featured/index" />
      <Stack.Screen name="featured/[category]" />
      <Stack.Screen name="featured/[id]" />
      <Stack.Screen name="search/filters" />
      <Stack.Screen name="search/results" />
      <Stack.Screen name="profile/[id]" />
      <Stack.Screen name="profile/gallery" options={{ animation: 'fade' }} />
      <Stack.Screen name="profile/send-interest" options={{ presentation: 'transparentModal', animation: 'fade' }} />
      <Stack.Screen name="interests/received" />
      <Stack.Screen name="interests/accepted" />
      <Stack.Screen name="shortlist" />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="plans/index" />
      <Stack.Screen name="plans/addons" />
      <Stack.Screen name="plans/checkout" />
      <Stack.Screen name="plans/success" />
      <Stack.Screen name="plans/failure" />
      <Stack.Screen name="subscription" />
      <Stack.Screen name="edit/profile" />
      <Stack.Screen name="edit/photos" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="verify/index" />
      <Stack.Screen name="verify/document" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="help" />
      <Stack.Screen name="delete-account" />
    </Stack>
  );
}
