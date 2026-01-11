import { router } from 'expo-router'
import { useAuth } from '@/components/auth/auth-provider'
import { AppText } from '@/components/app-text'
import { AppConfig } from '@/constants/app-config'
import { StoicColors } from '@/constants/colors'
import { StoicLogo } from '@/components/ui/stoic-logo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator, View, StyleSheet, Pressable } from 'react-native'

export default function SignIn() {
  const { signIn, isLoading } = useAuth()

  const handleConnect = async () => {
    await signIn()
    router.replace('/')
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={StoicColors.emberGold} size="large" />
      ) : (
        <SafeAreaView style={styles.safeArea}>
          {/* Top spacer */}
          <View style={styles.spacer} />

          {/* Logo and branding */}
          <View style={styles.brandingContainer}>
            <StoicLogo size={100} variant="white" />
            <AppText style={styles.title}>{AppConfig.name}</AppText>
            <AppText style={styles.tagline}>{AppConfig.description}</AppText>
          </View>

          {/* Connect button */}
          <View style={styles.buttonContainer}>
            <AppText style={styles.connectHint}>Connect with Seed Vault</AppText>
            <Pressable
              style={({ pressed }) => [styles.connectButton, pressed && styles.connectButtonPressed]}
              onPress={handleConnect}
            >
              <AppText style={styles.connectButtonText}>CONNECT WALLET</AppText>
            </Pressable>
            <AppText style={styles.disclaimer}>
              Built for Solana Seeker
            </AppText>
          </View>
        </SafeAreaView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StoicColors.obsidian,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  spacer: {
    flex: 0.5,
  },
  brandingContainer: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: StoicColors.white,
    letterSpacing: 8,
    marginTop: 16,
  },
  tagline: {
    fontSize: 14,
    color: StoicColors.stone,
    letterSpacing: 2,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  connectHint: {
    fontSize: 12,
    color: StoicColors.stone,
    letterSpacing: 1,
  },
  connectButton: {
    backgroundColor: StoicColors.emberGold,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  connectButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: StoicColors.obsidian,
    letterSpacing: 2,
  },
  disclaimer: {
    fontSize: 11,
    color: StoicColors.stone,
    marginTop: 8,
  },
})
