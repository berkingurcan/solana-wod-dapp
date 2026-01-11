import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { AppText } from '@/components/app-text'
import { StoicColors } from '@/constants/colors'
import { Exercise } from '@/data/workouts'
import Svg, { Path } from 'react-native-svg'

interface ExerciseItemProps {
  exercise: Exercise
  index: number
  isCompleted: boolean
  onToggle: () => void
}

function CheckIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17L4 12"
        stroke={StoicColors.white}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function ExerciseItem({ exercise, index, isCompleted, onToggle }: ExerciseItemProps) {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.indexContainer}>
        <AppText style={styles.index}>{String(index + 1).padStart(2, '0')}</AppText>
      </View>

      <View style={styles.content}>
        <AppText style={[styles.name, isCompleted && styles.completedText]}>{exercise.name}</AppText>
        <AppText style={[styles.reps, isCompleted && styles.completedText]}>{exercise.reps}</AppText>
        {exercise.notes && (
          <AppText style={[styles.notes, isCompleted && styles.completedText]}>
            {exercise.notes}
          </AppText>
        )}
      </View>

      <Pressable onPress={onToggle} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}>
          {isCompleted && <CheckIcon />}
        </View>
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: StoicColors.white,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: StoicColors.obsidian,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: StoicColors.cloud,
  },
  indexContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: StoicColors.obsidian,
    justifyContent: 'center',
    alignItems: 'center',
  },
  index: {
    color: StoicColors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: StoicColors.ink,
  },
  reps: {
    fontSize: 14,
    color: StoicColors.emberGold,
    fontWeight: '600',
  },
  notes: {
    fontSize: 12,
    color: StoicColors.stone,
    fontStyle: 'italic',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  checkboxContainer: {
    padding: 4,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: StoicColors.stone,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: StoicColors.forest,
    borderColor: StoicColors.forest,
  },
})
