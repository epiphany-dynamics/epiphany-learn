/**
 * Reward definitions for module completion
 * Each module unlocks a free downloadable cheat sheet.
 * Completing all 7 modules unlocks the AI Literate certificate.
 */

export interface Reward {
  id: string
  moduleId: string
  title: string
  description: string
  icon: string
  fileName: string // PDF filename in /public/rewards/
}

export const MODULE_REWARDS: Record<string, Reward> = {
  'module-1': {
    id: 'cheatsheet-jargon-decoder',
    moduleId: 'module-1',
    title: 'AI Jargon Decoder',
    description: 'Plain-English definitions of every AI term you\'ll encounter — LLM, hallucination, prompt, model, training data, and more.',
    icon: '📖',
    fileName: 'ai-jargon-decoder.pdf',
  },
  'module-2': {
    id: 'cheatsheet-50-prompts',
    moduleId: 'module-2',
    title: '50 Prompts That Actually Work',
    description: 'Copy-paste prompts for everyday tasks — writing emails, brainstorming, research, planning, and more.',
    icon: '💬',
    fileName: '50-prompts-that-work.pdf',
  },
  'module-3': {
    id: 'cheatsheet-ai-tools',
    moduleId: 'module-3',
    title: 'AI Tools Worth Trying',
    description: 'A curated list of free AI tools organized by what you actually want to do — writing, scheduling, learning, creating.',
    icon: '🛠️',
    fileName: 'ai-tools-worth-trying.pdf',
  },
  'module-4': {
    id: 'cheatsheet-safety',
    moduleId: 'module-4',
    title: 'AI Safety Checklist',
    description: 'What to share, what never to share, and how to spot fakes — one page you can keep on your desk.',
    icon: '🛡️',
    fileName: 'ai-safety-checklist.pdf',
  },
  'module-5': {
    id: 'cheatsheet-red-flags',
    moduleId: 'module-5',
    title: 'AI Vendor Red Flag Guide',
    description: 'Red flags, trick phrases, and the 12 questions that cut through any AI sales pitch.',
    icon: '🚩',
    fileName: 'ai-vendor-red-flag-guide.pdf',
  },
  'module-6': {
    id: 'cheatsheet-project-planner',
    moduleId: 'module-6',
    title: 'Your First AI Project Planner',
    description: 'A one-page worksheet to pick, run, and evaluate your first AI experiment.',
    icon: '📋',
    fileName: 'ai-project-planner.pdf',
  },
  'module-7': {
    id: 'cheatsheet-bill-of-rights',
    moduleId: 'module-7',
    title: 'Your AI Bill of Rights',
    description: 'What you should demand from any AI tool — privacy, transparency, bias protections, and how to enforce them.',
    icon: '📜',
    fileName: 'ai-bill-of-rights.pdf',
  },
}

export const ALL_MODULE_IDS = [
  'module-1', 'module-2', 'module-3', 'module-4',
  'module-5', 'module-6', 'module-7',
]

export function getRewardForModule(moduleId: string): Reward | undefined {
  return MODULE_REWARDS[moduleId]
}

export function getUnlockedRewards(completedModuleIds: string[]): Reward[] {
  return completedModuleIds
    .map((id) => MODULE_REWARDS[id])
    .filter(Boolean) as Reward[]
}

export function hasCompletedAllModules(completedModuleIds: string[]): boolean {
  return ALL_MODULE_IDS.every((id) => completedModuleIds.includes(id))
}
