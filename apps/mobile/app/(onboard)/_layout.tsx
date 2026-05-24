import { Stack } from 'expo-router';

export default function OnboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="for-whom" />
      <Stack.Screen name="basic" />
      <Stack.Screen name="physical" />
      <Stack.Screen name="community" />
      <Stack.Screen name="location" />
      <Stack.Screen name="native" />
      <Stack.Screen name="education" />
      <Stack.Screen name="profession" />
      <Stack.Screen name="lifestyle" />
      <Stack.Screen name="family" />
      <Stack.Screen name="horoscope" />
      <Stack.Screen name="about" />
      <Stack.Screen name="photos" />
      <Stack.Screen name="prefs-basic" />
      <Stack.Screen name="prefs-community" />
      <Stack.Screen name="prefs-career" />
    </Stack>
  );
}
