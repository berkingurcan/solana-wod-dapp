import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path, Rect, G } from 'react-native-svg'
import { StoicColors } from '@/constants/colors'

interface StoicLogoProps {
  size?: number
  variant?: 'default' | 'gold' | 'white' | 'dark'
}

/**
 * STOIC Logo
 * A stylized "S" representing a pillar/spine - symbolizing strength, discipline, and stoic philosophy
 * The S is designed with sharp geometric lines and a subtle pillar aesthetic
 */
export function StoicLogo({ size = 48, variant = 'default' }: StoicLogoProps) {
  const colors = {
    default: {
      primary: StoicColors.obsidian,
      accent: StoicColors.emberGold,
    },
    gold: {
      primary: StoicColors.emberGold,
      accent: StoicColors.brightGold,
    },
    white: {
      primary: StoicColors.white,
      accent: StoicColors.emberGold,
    },
    dark: {
      primary: StoicColors.obsidian,
      accent: StoicColors.obsidian,
    },
  }

  const { primary, accent } = colors[variant]

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Stylized S shaped like a pillar/spine */}
      <G>
        {/* Main S shape - geometric and strong */}
        <Path
          d="M70 20 L30 20 L30 28 L62 28 L62 42 L30 42 L30 78 L70 78 L70 70 L38 70 L38 58 L70 58 L70 20"
          fill={primary}
        />
        {/* Gold accent bar at top */}
        <Rect x="30" y="20" width="40" height="4" fill={accent} />
        {/* Gold accent bar at bottom */}
        <Rect x="30" y="78" width="40" height="4" fill={accent} />
      </G>
    </Svg>
  )
}

/**
 * STOIC Logo with text
 */
export function StoicLogoFull({ size = 120 }: { size?: number }) {
  const scale = size / 120

  return (
    <View style={styles.container}>
      <StoicLogo size={size * 0.4} variant="default" />
      <Svg width={size} height={size * 0.25} viewBox="0 0 200 40">
        <Path
          d="M10 8 L50 8 L50 14 L16 14 L16 20 L44 20 L44 26 L16 26 L16 32 L50 32 L50 38 L10 38 L10 8"
          fill={StoicColors.obsidian}
        />
        {/* S */}
        <Path
          d="M60 8 L100 8 L100 14 L66 14 L66 20 L94 20 L94 32 L66 32 L66 38 L100 38 L100 32 L72 32 L72 26 L100 26 L100 14 L66 14 L66 8"
          fill={StoicColors.obsidian}
        />
      </Svg>
    </View>
  )
}

/**
 * Simple S icon for app icon usage
 */
export function StoicIconMark({ size = 24, color = StoicColors.obsidian }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M17 5H7V7H15V9H7V19H17V17H9V15H17V5Z"
        fill={color}
      />
      <Rect x="7" y="5" width="10" height="1" fill={StoicColors.emberGold} />
      <Rect x="7" y="18" width="10" height="1" fill={StoicColors.emberGold} />
    </Svg>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
})
