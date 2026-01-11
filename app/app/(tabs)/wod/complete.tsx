import React, { useState } from 'react'
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '@/components/app-text'
import { useWorkout } from '@/components/wod'
import { useMintWorkoutNft, getUserFriendlyErrorMessage } from '@/components/nft'
import { StoicColors } from '@/constants/colors'
import { getWorkoutById } from '@/data/workouts'
import Svg, { Path, Circle } from 'react-native-svg'

function TrophyIcon() {
  return (
    <Svg width={80} height={80} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 21H16M12 17V21M6 3H18V7C18 10.3137 15.3137 13 12 13C8.68629 13 6 10.3137 6 7V3Z"
        stroke={StoicColors.emberGold}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 7H4C3.44772 7 3 7.44772 3 8V9C3 10.6569 4.34315 12 6 12"
        stroke={StoicColors.emberGold}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 7H20C20.5523 7 21 7.44772 21 8V9C21 10.6569 19.6569 12 18 12"
        stroke={StoicColors.emberGold}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function CheckCircleIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} fill={StoicColors.forest} />
      <Path
        d="M8 12L11 15L16 9"
        stroke={StoicColors.white}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default function CompleteScreen() {
  const router = useRouter()
  const { currentWorkout, completedWorkouts, resetWorkout, markNftMinted } = useWorkout()
  const mintNft = useMintWorkoutNft()
  const [mintSuccess, setMintSuccess] = useState(false)
  const [mintError, setMintError] = useState<string | null>(null)

  // Get the latest completed workout
  const latestCompleted = completedWorkouts[completedWorkouts.length - 1]
  const workout = currentWorkout || (latestCompleted ? getWorkoutById(latestCompleted.workoutId) : null)

  const handleMintNft = async () => {
    if (!latestCompleted || !workout) return

    setMintError(null)

    try {
      const result = await mintNft.mutateAsync({
        workout,
        completedAt: latestCompleted.completedAt,
      })

      await markNftMinted(latestCompleted.workoutId, result.mintAddress)
      setMintSuccess(true)
    } catch (error) {
      console.error('Mint error:', error)
      const friendlyMessage = error instanceof Error
        ? getUserFriendlyErrorMessage(error)
        : 'Failed to mint NFT. Please try again.'
      setMintError(friendlyMessage)
    }
  }

  const handleDone = () => {
    resetWorkout()
    router.replace('/wod')
  }

  const completedDate = latestCompleted
    ? new Date(latestCompleted.completedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : ''

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Trophy Icon */}
          <View style={styles.iconContainer}>
            <TrophyIcon />
          </View>

          {/* Congratulations */}
          <AppText style={styles.title}>WORKOUT COMPLETE</AppText>
          <AppText style={styles.subtitle}>
            {workout?.name || latestCompleted?.workoutName || 'Unknown'}
          </AppText>

          {/* Stats */}
          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <AppText style={styles.statLabel}>DATE</AppText>
              <AppText style={styles.statValue}>{completedDate}</AppText>
            </View>
            <View style={styles.statRow}>
              <AppText style={styles.statLabel}>EXERCISES</AppText>
              <AppText style={styles.statValue}>
                {workout?.exercises.length || latestCompleted?.exerciseCount || 0}
              </AppText>
            </View>
            <View style={styles.statRow}>
              <AppText style={styles.statLabel}>STATUS</AppText>
              <View style={styles.statusBadge}>
                <CheckCircleIcon />
                <AppText style={styles.statusText}>COMPLETED</AppText>
              </View>
            </View>
          </View>

          {/* Mint Section */}
          <View style={styles.mintSection}>
            <AppText style={styles.mintTitle}>MINT YOUR ACHIEVEMENT</AppText>
            <AppText style={styles.mintDescription}>
              Create an NFT to immortalize this workout on the Solana blockchain.
            </AppText>

            {mintError && <AppText style={styles.errorText}>{mintError}</AppText>}

            {mintSuccess ? (
              <View style={styles.successContainer}>
                <CheckCircleIcon />
                <AppText style={styles.successText}>NFT MINTED SUCCESSFULLY!</AppText>
              </View>
            ) : (
              <Pressable
                style={[styles.mintButton, mintNft.isPending && styles.mintButtonDisabled]}
                onPress={handleMintNft}
                disabled={mintNft.isPending || !latestCompleted}
              >
                {mintNft.isPending ? (
                  <ActivityIndicator color={StoicColors.obsidian} />
                ) : (
                  <AppText style={styles.mintButtonText}>MINT NFT</AppText>
                )}
              </Pressable>
            )}
          </View>
        </View>

        {/* Done Button */}
        <View style={styles.footer}>
          <Pressable style={styles.doneButton} onPress={handleDone}>
            <AppText style={styles.doneButtonText}>DONE</AppText>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StoicColors.obsidian,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: StoicColors.white,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: StoicColors.emberGold,
    letterSpacing: 2,
    marginBottom: 32,
  },
  statsCard: {
    width: '100%',
    backgroundColor: StoicColors.gunmetal,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    marginBottom: 32,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: StoicColors.stone,
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: StoicColors.white,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: StoicColors.forest,
  },
  mintSection: {
    width: '100%',
    alignItems: 'center',
  },
  mintTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: StoicColors.white,
    letterSpacing: 2,
    marginBottom: 8,
  },
  mintDescription: {
    fontSize: 14,
    color: StoicColors.stone,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 14,
    color: StoicColors.crimson,
    marginBottom: 16,
    textAlign: 'center',
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  successText: {
    fontSize: 14,
    fontWeight: '700',
    color: StoicColors.forest,
  },
  mintButton: {
    backgroundColor: StoicColors.emberGold,
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  mintButtonDisabled: {
    opacity: 0.7,
  },
  mintButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: StoicColors.obsidian,
    letterSpacing: 2,
  },
  footer: {
    padding: 16,
  },
  doneButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: StoicColors.white,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: StoicColors.white,
    letterSpacing: 2,
  },
})
