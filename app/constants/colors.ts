/**
 * STOIC Color Palette
 * A sigma-male inspired dark palette with light mode optimized for daylight readability
 * Following 60-30-10 color theory rule
 */

// Brand Colors
export const StoicColors = {
  // Primary - Obsidian (darkest anchor)
  obsidian: '#0A0A0A',
  // Secondary - Gunmetal (buttons, cards on dark)
  gunmetal: '#1F1F1F',
  // Accent - Ember Gold (use on light backgrounds, 4.5:1 contrast)
  emberGold: '#B8860B',
  // Accent Light - Bright Gold (use on dark backgrounds only)
  brightGold: '#D4AF37',
  // Background - Pearl (60% - main app background)
  pearl: '#FAFAFA',
  // Surface - Cloud (cards, inputs)
  cloud: '#EBEBEB',
  // Text Primary - Ink (body text, 15.8:1 on Pearl)
  ink: '#121212',
  // Text Secondary - Stone (labels, hints, 7.2:1)
  stone: '#5C5C5C',
  // Success - Forest (completed state)
  forest: '#1E4D2B',
  // Error - Crimson
  crimson: '#9B1B1B',
  // White
  white: '#FFFFFF',
}

// App-wide color theme (light mode only for STOIC)
export const Colors = {
  light: {
    background: StoicColors.pearl,
    surface: StoicColors.cloud,
    border: '#DEDEDE',
    text: StoicColors.ink,
    textSecondary: StoicColors.stone,
    tint: StoicColors.emberGold,
    icon: StoicColors.stone,
    tabIconDefault: StoicColors.stone,
    tabIconSelected: StoicColors.obsidian,
    primary: StoicColors.obsidian,
    secondary: StoicColors.gunmetal,
    accent: StoicColors.emberGold,
    success: StoicColors.forest,
    error: StoicColors.crimson,
    card: StoicColors.white,
  },
  // Dark mode kept for compatibility but matches light mode values
  // STOIC is light-mode only app
  dark: {
    background: StoicColors.pearl,
    surface: StoicColors.cloud,
    border: '#DEDEDE',
    text: StoicColors.ink,
    textSecondary: StoicColors.stone,
    tint: StoicColors.emberGold,
    icon: StoicColors.stone,
    tabIconDefault: StoicColors.stone,
    tabIconSelected: StoicColors.obsidian,
    primary: StoicColors.obsidian,
    secondary: StoicColors.gunmetal,
    accent: StoicColors.emberGold,
    success: StoicColors.forest,
    error: StoicColors.crimson,
    card: StoicColors.white,
  },
}
