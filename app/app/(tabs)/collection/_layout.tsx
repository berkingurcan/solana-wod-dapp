import { Stack } from 'expo-router'
import { StoicColors } from '@/constants/colors'

export default function CollectionLayout() {
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
          headerTitle: 'MY COLLECTION',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 18,
          },
        }}
      />
    </Stack>
  )
}
