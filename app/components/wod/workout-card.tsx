import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { AppText } from '@/components/app-text'
import { StoicColors } from '@/constants/colors'
import { Workout } from '@/data/workouts'

interface WorkoutCardProps {
  workout: Workout
  onPress?: () => void
  variant?: 'default' | 'featured'
}

export function WorkoutCard({ workout, onPress, variant = 'default' }: WorkoutCardProps) {
  const isFeatured = variant === 'featured'

  const difficultyColor = {
    beginner: StoicColors.forest,
    intermediate: StoicColors.emberGold,
    advanced: StoicColors.crimson,
  }[workout.difficulty]

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isFeatured && styles.featuredCard,
        pressed && styles.pressed,
      ]}
    >
      {isFeatured && (
        <View style={styles.featuredBadge}>
          <AppText style={styles.featuredBadgeText}>TODAY'S WOD</AppText>
        </View>
      )}

      <View style={styles.header}>
        <AppText style={[styles.title, isFeatured && styles.featuredTitle]}>{workout.name}</AppText>
        <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}>
          <AppText style={styles.difficultyText}>{workout.difficulty.toUpperCase()}</AppText>
        </View>
      </View>

      <AppText style={styles.description}>{workout.description}</AppText>

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <AppText style={styles.metaLabel}>EXERCISES</AppText>
          <AppText style={styles.metaValue}>{workout.exercises.length}</AppText>
        </View>
        <View style={styles.metaItem}>
          <AppText style={styles.metaLabel}>TIME</AppText>
          <AppText style={styles.metaValue}>{workout.estimatedMinutes} MIN</AppText>
        </View>
      </View>

      <View style={styles.tags}>
        {workout.tags.slice(0, 3).map((tag) => (
          <View key={tag} style={styles.tag}>
            <AppText style={styles.tagText}>{tag}</AppText>
          </View>
        ))}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: StoicColors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: StoicColors.obsidian,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredCard: {
    backgroundColor: StoicColors.obsidian,
    borderWidth: 2,
    borderColor: StoicColors.emberGold,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  featuredBadge: {
    backgroundColor: StoicColors.emberGold,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  featuredBadgeText: {
    color: StoicColors.obsidian,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: StoicColors.ink,
    letterSpacing: 0.5,
  },
  featuredTitle: {
    color: StoicColors.white,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyText: {
    color: StoicColors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: StoicColors.stone,
    lineHeight: 20,
    marginBottom: 16,
  },
  meta: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
  },
  metaItem: {
    gap: 2,
  },
  metaLabel: {
    fontSize: 10,
    color: StoicColors.stone,
    fontWeight: '600',
    letterSpacing: 1,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '700',
    color: StoicColors.ink,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: StoicColors.cloud,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: StoicColors.stone,
    fontWeight: '500',
  },
})
