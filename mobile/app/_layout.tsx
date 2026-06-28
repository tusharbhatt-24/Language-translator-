import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk'
import { Sora_400Regular, Sora_500Medium, Sora_600SemiBold } from '@expo-google-fonts/sora'
import { View, ActivityIndicator } from 'react-native'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    // Alias — components reference these shorter names
    SpaceGrotesk: SpaceGrotesk_400Regular,
    'SpaceGrotesk-Medium': SpaceGrotesk_500Medium,
    'SpaceGrotesk-SemiBold': SpaceGrotesk_600SemiBold,
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
    Sora: Sora_400Regular,
    'Sora-Medium': Sora_500Medium,
    'Sora-SemiBold': Sora_600SemiBold,
  })

  if (!fontsLoaded) {
    // Minimal loading state — no splash screen yet
    return (
      <View style={{ flex: 1, backgroundColor: '#F5F0EB', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#C1440E" />
      </View>
    )
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="#F5F0EB" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}
