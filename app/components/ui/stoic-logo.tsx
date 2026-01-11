import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

interface StoicLogoProps {
  size?: number
  variant?: 'default' | 'gold' | 'white' | 'dark'
}

export function StoicLogo({ size = 48 }: StoicLogoProps) {
  return (
    <Image
      source={require('@/assets/images/logo.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  )
}

export function StoicLogoFull({ size = 120 }: { size?: number }) {
  return (
    <View style={styles.container}>
      <StoicLogo size={size * 0.4} />
    </View>
  )
}

export function StoicIconMark({ size = 24 }: { size?: number; color?: string }) {
  return (
    <Image
      source={require('@/assets/images/logo.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
})
