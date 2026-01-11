/**
 * STOIC Workout Data
 * Functional fitness WODs (Workout of the Day)
 */

export interface Exercise {
  id: string
  name: string
  reps: string // Can be "10", "10-15", "Max", "30 sec", etc.
  notes?: string
}

export interface Workout {
  id: string
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedMinutes: number
  exercises: Exercise[]
  tags: string[]
}

export const workouts: Workout[] = [
  {
    id: 'wod-001',
    name: 'THE GRIND',
    description: 'A classic functional circuit to build mental toughness and full-body endurance.',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    exercises: [
      { id: 'ex-001-1', name: 'Burpees', reps: '15' },
      { id: 'ex-001-2', name: 'Air Squats', reps: '20' },
      { id: 'ex-001-3', name: 'Push-ups', reps: '15' },
      { id: 'ex-001-4', name: 'Lunges', reps: '20 (10 each leg)' },
      { id: 'ex-001-5', name: 'Mountain Climbers', reps: '30' },
      { id: 'ex-001-6', name: 'Plank Hold', reps: '60 sec' },
    ],
    tags: ['full-body', 'no-equipment', 'endurance'],
  },
  {
    id: 'wod-002',
    name: 'IRON WILL',
    description: 'Push your limits with this high-intensity upper body destroyer.',
    difficulty: 'advanced',
    estimatedMinutes: 30,
    exercises: [
      { id: 'ex-002-1', name: 'Diamond Push-ups', reps: '12' },
      { id: 'ex-002-2', name: 'Pike Push-ups', reps: '10' },
      { id: 'ex-002-3', name: 'Wide Push-ups', reps: '15' },
      { id: 'ex-002-4', name: 'Tricep Dips', reps: '15', notes: 'Use chair or bench' },
      { id: 'ex-002-5', name: 'Plank to Push-up', reps: '10' },
      { id: 'ex-002-6', name: 'Superman Hold', reps: '45 sec' },
      { id: 'ex-002-7', name: 'Arm Circles', reps: '30 sec each direction' },
    ],
    tags: ['upper-body', 'push', 'strength'],
  },
  {
    id: 'wod-003',
    name: 'SIGMA LEGS',
    description: 'Forge unbreakable legs with this brutal lower body session.',
    difficulty: 'intermediate',
    estimatedMinutes: 20,
    exercises: [
      { id: 'ex-003-1', name: 'Jump Squats', reps: '15' },
      { id: 'ex-003-2', name: 'Bulgarian Split Squats', reps: '12 each leg' },
      { id: 'ex-003-3', name: 'Glute Bridges', reps: '20' },
      { id: 'ex-003-4', name: 'Calf Raises', reps: '25' },
      { id: 'ex-003-5', name: 'Wall Sit', reps: '45 sec' },
      { id: 'ex-003-6', name: 'Box Jumps', reps: '10', notes: 'Use stairs or sturdy surface' },
    ],
    tags: ['lower-body', 'legs', 'explosive'],
  },
  {
    id: 'wod-004',
    name: 'CORE DOMINANCE',
    description: 'Sculpt an iron core with this abs-focused gauntlet.',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    exercises: [
      { id: 'ex-004-1', name: 'Crunches', reps: '20' },
      { id: 'ex-004-2', name: 'Leg Raises', reps: '15' },
      { id: 'ex-004-3', name: 'Russian Twists', reps: '20 (10 each side)' },
      { id: 'ex-004-4', name: 'Bicycle Crunches', reps: '20' },
      { id: 'ex-004-5', name: 'Dead Bug', reps: '10 each side' },
      { id: 'ex-004-6', name: 'Plank Hold', reps: '45 sec' },
    ],
    tags: ['core', 'abs', 'no-equipment'],
  },
  {
    id: 'wod-005',
    name: 'APEX PREDATOR',
    description: 'The ultimate full-body AMRAP. Complete as many rounds as possible in 20 minutes.',
    difficulty: 'advanced',
    estimatedMinutes: 20,
    exercises: [
      { id: 'ex-005-1', name: 'Burpees', reps: '10' },
      { id: 'ex-005-2', name: 'Pistol Squats', reps: '5 each leg', notes: 'Use wall for balance if needed' },
      { id: 'ex-005-3', name: 'Handstand Push-ups', reps: '5', notes: 'Pike push-ups as alternative' },
      { id: 'ex-005-4', name: 'Tuck Jumps', reps: '10' },
      { id: 'ex-005-5', name: 'V-ups', reps: '15' },
    ],
    tags: ['full-body', 'amrap', 'advanced', 'functional'],
  },
]

// Helper function to get today's workout (cycles through workouts by day)
export function getTodaysWorkout(): Workout {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  )
  return workouts[dayOfYear % workouts.length]
}

// Helper function to get workout by ID
export function getWorkoutById(id: string): Workout | undefined {
  return workouts.find((w) => w.id === id)
}
