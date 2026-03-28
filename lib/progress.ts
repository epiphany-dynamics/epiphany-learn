/**
 * localStorage-based progress tracking
 * Key: epiphany_learn_progress
 * Anon-first — no auth required to track progress
 */

export interface LessonProgress {
  completed: boolean
  completedAt?: string
  score?: number
}

export interface ModuleProgress {
  completed: boolean
  completedAt?: string
  lessons: Record<string, LessonProgress>
}

export interface LastVisited {
  moduleId: string
  lessonSlug: string
  lessonTitle: string
  visitedAt: string
}

export interface ProgressState {
  modules: Record<string, ModuleProgress>
  badges: string[]
  unlockedRewards: string[]  // reward IDs unlocked via module completion
  xp: number
  streak: number
  streakLastDate: string | null  // YYYY-MM-DD of last lesson completion
  lastVisited: LastVisited | null
  lastUpdated: string
}

const STORAGE_KEY = 'epiphany_learn_progress'

function todayDate(): string {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayDate(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

function getDefaultState(): ProgressState {
  return {
    modules: {},
    badges: [],
    unlockedRewards: [],
    xp: 0,
    streak: 0,
    streakLastDate: null,
    lastVisited: null,
    lastUpdated: new Date().toISOString(),
  }
}

export function getProgress(): ProgressState {
  if (typeof window === 'undefined') return getDefaultState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultState()
    const parsed = JSON.parse(raw) as ProgressState
    // Backfill missing fields for existing users
    if (parsed.streak === undefined) parsed.streak = 0
    if (parsed.streakLastDate === undefined) parsed.streakLastDate = null
    if (parsed.lastVisited === undefined) parsed.lastVisited = null
    if (parsed.unlockedRewards === undefined) parsed.unlockedRewards = []
    return parsed
  } catch {
    return getDefaultState()
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === 'undefined') return
  try {
    state.lastUpdated = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded)
  }
}

/**
 * Updates the streak counter based on the current date.
 * - If last completion was today: streak unchanged (already counted)
 * - If last completion was yesterday: streak +1
 * - If last completion was earlier (gap): streak resets to 1
 * - If never completed before: streak starts at 1
 * Returns the new streak value.
 */
export function updateStreak(state: ProgressState): number {
  const today = todayDate()
  const yesterday = yesterdayDate()

  if (state.streakLastDate === today) {
    // Already completed something today — streak stays
    return state.streak
  }

  if (state.streakLastDate === yesterday) {
    // Consecutive day — increment
    state.streak = (state.streak || 0) + 1
  } else {
    // Gap or first time — reset to 1
    state.streak = 1
  }

  state.streakLastDate = today
  return state.streak
}

/**
 * Track the last lesson a user visited (called on lesson page load).
 */
export function setLastVisited(moduleId: string, lessonSlug: string, lessonTitle: string): void {
  const state = getProgress()
  state.lastVisited = {
    moduleId,
    lessonSlug,
    lessonTitle,
    visitedAt: new Date().toISOString(),
  }
  saveProgress(state)
}

export function completeLesson(
  moduleId: string,
  lessonId: string,
  xpReward: number,
  score?: number
): ProgressState {
  const state = getProgress()

  if (!state.modules[moduleId]) {
    state.modules[moduleId] = { completed: false, lessons: {} }
  }

  state.modules[moduleId].lessons[lessonId] = {
    completed: true,
    completedAt: new Date().toISOString(),
    score,
  }

  state.xp += xpReward
  updateStreak(state)
  saveProgress(state)
  return state
}

export function completeModule(moduleId: string, xpReward: number): ProgressState {
  const state = getProgress()

  if (!state.modules[moduleId]) {
    state.modules[moduleId] = { completed: false, lessons: {} }
  }

  state.modules[moduleId].completed = true
  state.modules[moduleId].completedAt = new Date().toISOString()
  state.xp += xpReward
  saveProgress(state)
  return state
}

export function awardBadge(badgeId: string): ProgressState {
  const state = getProgress()
  if (!state.badges.includes(badgeId)) {
    state.badges.push(badgeId)
    saveProgress(state)
  }
  return state
}

export function unlockReward(rewardId: string): ProgressState {
  const state = getProgress()
  if (!state.unlockedRewards.includes(rewardId)) {
    state.unlockedRewards.push(rewardId)
    saveProgress(state)
  }
  return state
}

export function isRewardUnlocked(rewardId: string): boolean {
  const state = getProgress()
  return state.unlockedRewards.includes(rewardId)
}

export function isLessonCompleted(moduleId: string, lessonId: string): boolean {
  const state = getProgress()
  return state.modules[moduleId]?.lessons[lessonId]?.completed ?? false
}

export function isModuleCompleted(moduleId: string): boolean {
  const state = getProgress()
  return state.modules[moduleId]?.completed ?? false
}

export function getModuleProgressPct(moduleId: string, totalLessons: number): number {
  if (totalLessons === 0) return 0
  const state = getProgress()
  const mod = state.modules[moduleId]
  if (!mod) return 0
  const completed = Object.values(mod.lessons).filter((l) => l.completed).length
  return Math.round((completed / totalLessons) * 100)
}

export function getCompletedLessonCount(moduleId: string): number {
  const state = getProgress()
  const mod = state.modules[moduleId]
  if (!mod) return 0
  return Object.values(mod.lessons).filter((l) => l.completed).length
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
