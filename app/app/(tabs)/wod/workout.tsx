import React from 'react'
import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppText } from '@/components/app-text'
import { ExerciseItem, useWorkout } from '@/components/wod'
import { StoicColors } from '@/constants/colors'

export default function WorkoutScreen() {
  const router = useRouter()
  const {
    currentWorkout,
    completedExercises,
    isWorkoutComplete,
    toggleExercise,
    completeWorkout,
  } = useWorkout()

  if (!currentWorkout) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <AppText style={styles.errorText}>No workout selected</AppText>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <AppText style={styles.backButtonText}>GO BACK</AppText>
          </Pressable>
        </SafeAreaView>
      </View>
    )
  }

  const completedCount = completedExercises.size
  const totalCount = currentWorkout.exercises.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const handleComplete = async () => {
    const completed = await completeWorkout()
    if (completed) {
      router.replace('/wod/complete')
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <AppText style={styles.workoutName}>{currentWorkout.name}</AppText>
          <AppText style={styles.description}>{currentWorkout.description}</AppText>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <AppText style={styles.progressText}>
              {completedCount} / {totalCount}
            </AppText>
          </View>
        </View>

        {/* Exercise List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {currentWorkout.exercises.map((exercise, index) => (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              index={index}
              isCompleted={completedExercises.has(exercise.id)}
              onToggle={() => toggleExercise(exercise.id)}
            />
          ))}
        </ScrollView>

        {/* Complete Button */}
        <View style={styles.footer}>
          <Pressable
            style={[styles.completeButton, !isWorkoutComplete && styles.completeButtonDisabled]}
            onPress={handleComplete}
            disabled={!isWorkoutComplete}
          >
            <AppText
              style={[
                styles.completeButtonText,
                !isWorkoutComplete && styles.completeButtonTextDisabled,
              ]}
            >
              {isWorkoutComplete ? 'COMPLETE WORKOUT' : 'FINISH ALL EXERCISES'}
            </AppText>
          </Pressable>
        </View>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: StoicColors.stone,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: StoicColors.obsidian,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: StoicColors.white,
    fontWeight: '700',
    letterSpacing: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: StoicColors.cloud,
  },
  workoutName: {
    fontSize: 24,
    fontWeight: '800',
    color: StoicColors.obsidian,
    letterSpacing: 1,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: StoicColors.stone,
    lineHeight: 20,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: StoicColors.cloud,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: StoicColors.emberGold,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: StoicColors.obsidian,
    minWidth: 50,
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 10,
  },
  footer: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: StoicColors.cloud,
  },
  completeButton: {
    backgroundColor: StoicColors.obsidian,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonDisabled: {
    backgroundColor: StoicColors.cloud,
  },
  completeButtonText: {
    color: StoicColors.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  completeButtonTextDisabled: {
    color: StoicColors.stone,
  },
})
