import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Workout, Exercise } from '@/data/workouts'

interface CompletedWorkout {
  workoutId: string
  workoutName: string
  completedAt: string // ISO date string
  exerciseCount: number
  nftMinted: boolean
  nftMintAddress?: string
}

interface WorkoutState {
  // Current workout session
  currentWorkout: Workout | null
  completedExercises: Set<string>
  isWorkoutComplete: boolean

  // History
  completedWorkouts: CompletedWorkout[]

  // Actions
  startWorkout: (workout: Workout) => void
  toggleExercise: (exerciseId: string) => void
  completeWorkout: () => Promise<CompletedWorkout | null>
  resetWorkout: () => void
  loadCompletedWorkouts: () => Promise<void>
  markNftMinted: (workoutId: string, mintAddress: string) => Promise<void>
}

const WorkoutContext = createContext<WorkoutState | null>(null)

const STORAGE_KEY = 'stoic_completed_workouts'

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>([])

  const isWorkoutComplete =
    currentWorkout !== null &&
    currentWorkout.exercises.length > 0 &&
    currentWorkout.exercises.every((ex) => completedExercises.has(ex.id))

  const startWorkout = useCallback((workout: Workout) => {
    setCurrentWorkout(workout)
    setCompletedExercises(new Set())
  }, [])

  const toggleExercise = useCallback((exerciseId: string) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev)
      if (next.has(exerciseId)) {
        next.delete(exerciseId)
      } else {
        next.add(exerciseId)
      }
      return next
    })
  }, [])

  const completeWorkout = useCallback(async (): Promise<CompletedWorkout | null> => {
    if (!currentWorkout || !isWorkoutComplete) return null

    const completed: CompletedWorkout = {
      workoutId: currentWorkout.id,
      workoutName: currentWorkout.name,
      completedAt: new Date().toISOString(),
      exerciseCount: currentWorkout.exercises.length,
      nftMinted: false,
    }

    const updatedWorkouts = [...completedWorkouts, completed]
    setCompletedWorkouts(updatedWorkouts)

    // Persist to storage
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkouts))
    } catch (error) {
      console.error('Failed to save completed workout:', error)
    }

    return completed
  }, [currentWorkout, isWorkoutComplete, completedWorkouts])

  const resetWorkout = useCallback(() => {
    setCurrentWorkout(null)
    setCompletedExercises(new Set())
  }, [])

  const loadCompletedWorkouts = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      if (stored) {
        setCompletedWorkouts(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load completed workouts:', error)
    }
  }, [])

  const markNftMinted = useCallback(
    async (workoutId: string, mintAddress: string) => {
      const updatedWorkouts = completedWorkouts.map((w) =>
        w.workoutId === workoutId && !w.nftMinted
          ? { ...w, nftMinted: true, nftMintAddress: mintAddress }
          : w
      )
      setCompletedWorkouts(updatedWorkouts)

      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkouts))
      } catch (error) {
        console.error('Failed to update NFT mint status:', error)
      }
    },
    [completedWorkouts]
  )

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        completedExercises,
        isWorkoutComplete,
        completedWorkouts,
        startWorkout,
        toggleExercise,
        completeWorkout,
        resetWorkout,
        loadCompletedWorkouts,
        markNftMinted,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  const context = useContext(WorkoutContext)
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider')
  }
  return context
}
