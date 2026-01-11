import { Tabs } from 'expo-router'
import React from 'react'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'
import { StoicColors } from '@/constants/colors'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: StoicColors.obsidian,
        tabBarInactiveTintColor: StoicColors.stone,
        tabBarStyle: {
          backgroundColor: StoicColors.white,
          borderTopColor: StoicColors.cloud,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 10,
          letterSpacing: 0.5,
        },
      }}
    >
      {/* The index redirects to the wod screen */}
      <Tabs.Screen name="index" options={{ tabBarItemStyle: { display: 'none' } }} />
      <Tabs.Screen
        name="wod"
        options={{
          title: 'WOD',
          tabBarIcon: ({ color }) => <UiIconSymbol size={28} name="figure.run" color={color} />,
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: 'Collection',
          tabBarIcon: ({ color }) => <UiIconSymbol size={28} name="photo.stack" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <UiIconSymbol size={28} name="wallet.pass.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <UiIconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
      {/* Hide demo tab in STOIC app */}
      <Tabs.Screen name="demo" options={{ tabBarItemStyle: { display: 'none' } }} />
    </Tabs>
  )
}
