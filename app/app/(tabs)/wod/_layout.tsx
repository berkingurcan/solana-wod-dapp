import { Stack } from 'expo-router'
import { StoicColors } from '@/constants/colors'

export default function WodLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: StoicColors.pearl,
        },
        headerTintColor: StoicColors.obsidian,
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'STOIC',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="workout"
        options={{
          headerTitle: 'WORKOUT',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="complete"
        options={{
          headerTitle: 'COMPLETE',
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  )
}
