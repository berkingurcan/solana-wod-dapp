import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '@/components/app-text'
import { useWorkout } from '@/components/wod'
import { StoicColors } from '@/constants/colors'
import { getWorkoutById } from '@/data/workouts'
import Svg, { Path, Rect } from 'react-native-svg'

function NftIcon() {
  return (
    <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={3}
        width={18}
        height={18}
        rx={3}
        stroke={StoicColors.emberGold}
        strokeWidth={2}
      />
      <Path
        d="M8 12L11 15L16 9"
        stroke={StoicColors.emberGold}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function EmptyIcon() {
  return (
    <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={3}
        width={18}
        height={18}
        rx={3}
        stroke={StoicColors.stone}
        strokeWidth={1.5}
        strokeDasharray="4 2"
      />
      <Path
        d="M12 8V16M8 12H16"
        stroke={StoicColors.stone}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

interface NftCardProps {
  workoutName: string
  completedAt: string
  mintAddress?: string
}

function NftCard({ workoutName, completedAt, mintAddress }: NftCardProps) {
  const completedDate = new Date(completedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <View style={styles.nftCard}>
      <View style={styles.nftImagePlaceholder}>
        <NftIcon />
        <AppText style={styles.nftBadge}>NFT</AppText>
      </View>
      <View style={styles.nftInfo}>
        <AppText style={styles.nftName}>{workoutName}</AppText>
        <AppText style={styles.nftDate}>{completedDate}</AppText>
        {mintAddress && (
          <AppText style={styles.nftMint} numberOfLines={1}>
            {mintAddress}
          </AppText>
        )}
      </View>
    </View>
  )
}

export default function CollectionScreen() {
  const { completedWorkouts, loadCompletedWorkouts } = useWorkout()

  useEffect(() => {
    loadCompletedWorkouts()
  }, [loadCompletedWorkouts])

  // Filter only minted workouts
  const mintedWorkouts = completedWorkouts.filter((w) => w.nftMinted)

  // Get unminted completed workouts
  const unmintedWorkouts = completedWorkouts.filter((w) => !w.nftMinted)

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <AppText style={styles.statValue}>{mintedWorkouts.length}</AppText>
              <AppText style={styles.statLabel}>MINTED</AppText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <AppText style={styles.statValue}>{unmintedWorkouts.length}</AppText>
              <AppText style={styles.statLabel}>PENDING</AppText>
            </View>
          </View>

          {/* Minted NFTs */}
          {mintedWorkouts.length > 0 ? (
            <View style={styles.section}>
              <AppText style={styles.sectionTitle}>YOUR NFTS</AppText>
              <View style={styles.nftGrid}>
                {mintedWorkouts.map((workout, index) => (
                  <NftCard
                    key={`${workout.workoutId}-${index}`}
                    workoutName={workout.workoutName}
                    completedAt={workout.completedAt}
                    mintAddress={workout.nftMintAddress}
                  />
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <EmptyIcon />
              <AppText style={styles.emptyTitle}>NO NFTS YET</AppText>
              <AppText style={styles.emptyDescription}>
                Complete workouts and mint them to build your collection.
              </AppText>
            </View>
          )}

          {/* Unminted Workouts */}
          {unmintedWorkouts.length > 0 && (
            <View style={styles.section}>
              <AppText style={styles.sectionTitle}>READY TO MINT</AppText>
              <AppText style={styles.sectionSubtitle}>
                These completed workouts haven't been minted yet.
              </AppText>
              <View style={styles.pendingList}>
                {unmintedWorkouts.map((workout, index) => (
                  <View key={`${workout.workoutId}-${index}`} style={styles.pendingItem}>
                    <View style={styles.pendingInfo}>
                      <AppText style={styles.pendingName}>{workout.workoutName}</AppText>
                      <AppText style={styles.pendingDate}>
                        {new Date(workout.completedAt).toLocaleDateString()}
                      </AppText>
                    </View>
                    <View style={styles.pendingBadge}>
                      <AppText style={styles.pendingBadgeText}>PENDING</AppText>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StoicColors.pearl,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: StoicColors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: StoicColors.obsidian,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: StoicColors.obsidian,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: StoicColors.stone,
    letterSpacing: 1,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: StoicColors.cloud,
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: StoicColors.stone,
    letterSpacing: 2,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: StoicColors.stone,
    marginBottom: 12,
  },
  nftGrid: {
    marginTop: 12,
    gap: 12,
  },
  nftCard: {
    flexDirection: 'row',
    backgroundColor: StoicColors.white,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    shadowColor: StoicColors.obsidian,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nftImagePlaceholder: {
    width: 72,
    height: 72,
    backgroundColor: StoicColors.obsidian,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nftBadge: {
    position: 'absolute',
    bottom: 4,
    fontSize: 8,
    fontWeight: '800',
    color: StoicColors.emberGold,
    letterSpacing: 1,
  },
  nftInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  nftName: {
    fontSize: 16,
    fontWeight: '700',
    color: StoicColors.obsidian,
  },
  nftDate: {
    fontSize: 12,
    color: StoicColors.stone,
  },
  nftMint: {
    fontSize: 10,
    color: StoicColors.emberGold,
    fontFamily: 'monospace',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: StoicColors.obsidian,
    letterSpacing: 2,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: StoicColors.stone,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 32,
  },
  pendingList: {
    gap: 8,
  },
  pendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: StoicColors.white,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: StoicColors.emberGold,
  },
  pendingInfo: {
    flex: 1,
  },
  pendingName: {
    fontSize: 14,
    fontWeight: '600',
    color: StoicColors.obsidian,
  },
  pendingDate: {
    fontSize: 12,
    color: StoicColors.stone,
  },
  pendingBadge: {
    backgroundColor: StoicColors.cloud,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  pendingBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: StoicColors.stone,
    letterSpacing: 0.5,
  },
})
