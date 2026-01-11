import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '@/components/app-text'
import { WorkoutCard, useWorkout } from '@/components/wod'
import { StoicColors } from '@/constants/colors'
import { getTodaysWorkout, workouts } from '@/data/workouts'

export default function WodIndexScreen() {
  const router = useRouter()
  const { startWorkout, loadCompletedWorkouts, completedWorkouts } = useWorkout()
  const todaysWorkout = getTodaysWorkout()

  useEffect(() => {
    loadCompletedWorkouts()
  }, [loadCompletedWorkouts])

  const handleStartWorkout = (workoutId: string) => {
    const workout = workouts.find((w) => w.id === workoutId)
    if (workout) {
      startWorkout(workout)
      router.push('/wod/workout')
    }
  }

  // Get today's date formatted
  const today = new Date()
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <AppText style={styles.date}>{dateString.toUpperCase()}</AppText>
            <AppText style={styles.greeting}>TIME TO WORK.</AppText>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <AppText style={styles.statValue}>{completedWorkouts.length}</AppText>
              <AppText style={styles.statLabel}>COMPLETED</AppText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <AppText style={styles.statValue}>
                {completedWorkouts.filter((w) => w.nftMinted).length}
              </AppText>
              <AppText style={styles.statLabel}>MINTED</AppText>
            </View>
          </View>

          {/* Today's WOD */}
          <View style={styles.section}>
            <WorkoutCard
              workout={todaysWorkout}
              variant="featured"
              onPress={() => handleStartWorkout(todaysWorkout.id)}
            />
          </View>

          {/* Other Workouts */}
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>ALL WORKOUTS</AppText>
            <View style={styles.workoutList}>
              {workouts
                .filter((w) => w.id !== todaysWorkout.id)
                .map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    onPress={() => handleStartWorkout(workout.id)}
                  />
                ))}
            </View>
          </View>
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
  header: {
    marginBottom: 20,
  },
  date: {
    fontSize: 12,
    fontWeight: '600',
    color: StoicColors.stone,
    letterSpacing: 2,
    marginBottom: 4,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: StoicColors.obsidian,
    letterSpacing: 1,
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
    marginBottom: 12,
  },
  workoutList: {
    gap: 12,
  },
})
