/**
 * Badge and XP achievement logic
 * Each badge has an id, title, description, icon, and unlock condition
 */

export interface Badge {
  id: string
  title: string
  description: string
  icon: string // emoji fallback
  svgPath?: string // custom SVG badge asset in /public/badges/
  xpReward: number
}

export const BADGES: Record<string, Badge> = {
  'first-lesson': {
    id: 'first-lesson',
    title: 'First Step',
    description: 'Completed your first lesson',
    icon: '🚀',
    svgPath: '/badges/badge-first-step.svg',
    xpReward: 25,
  },
  'ai-fundamentals': {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    description: 'Mastered Module 1: What AI Actually Is',
    icon: '🧠',
    svgPath: '/badges/badge-module-1.svg',
    xpReward: 100,
  },
  'speed-learner': {
    id: 'speed-learner',
    title: 'Speed Learner',
    description: 'Completed a lesson in under 5 minutes',
    icon: '⚡',
    svgPath: '/badges/badge-speed-runner.svg',
    xpReward: 50,
  },
  'quiz-ace': {
    id: 'quiz-ace',
    title: 'Quiz Ace',
    description: 'Scored 100% on a quiz',
    icon: '🎯',
    svgPath: '/badges/badge-quiz-ace.svg',
    xpReward: 75,
  },
  'streak-3': {
    id: 'streak-3',
    title: 'On a Roll',
    description: 'Learned 3 days in a row',
    icon: '🔥',
    svgPath: '/badges/badge-streak-3.svg',
    xpReward: 50,
  },
  'streak-7': {
    id: 'streak-7',
    title: 'Unstoppable',
    description: 'Learned 7 days in a row',
    icon: '🔥',
    svgPath: '/badges/badge-streak-7.svg',
    xpReward: 75,
  },
  'ai-anxiety': {
    id: 'ai-anxiety',
    title: 'AI Anxiety Is Normal',
    description: 'Mastered Module 7: Fears, failures, and what you can actually trust',
    icon: '🛡️',
    svgPath: '/badges/badge-module-7.svg',
    xpReward: 100,
  },
  'full-stack': {
    id: 'full-stack',
    title: 'Full Stack',
    description: 'Completed all 7 modules',
    icon: '🎓',
    svgPath: '/badges/badge-full-stack.svg',
    xpReward: 150,
  },
}

export type XPLevel = {
  level: number
  title: string
  minXP: number
  maxXP: number
}

export const XP_LEVELS: XPLevel[] = [
  { level: 1, title: 'Curious Beginner', minXP: 0, maxXP: 100 },
  { level: 2, title: 'AI Aware', minXP: 100, maxXP: 300 },
  { level: 3, title: 'Automation Thinker', minXP: 300, maxXP: 600 },
  { level: 4, title: 'AI Practitioner', minXP: 600, maxXP: 1000 },
  { level: 5, title: 'Epiphany Expert', minXP: 1000, maxXP: Infinity },
]

export function getLevel(xp: number): XPLevel {
  return (
    XP_LEVELS.findLast((l) => xp >= l.minXP) ?? XP_LEVELS[0]
  )
}

export function getLevelProgress(xp: number): number {
  const level = getLevel(xp)
  if (level.maxXP === Infinity) return 100
  const range = level.maxXP - level.minXP
  const earned = xp - level.minXP
  return Math.min(100, Math.round((earned / range) * 100))
}
