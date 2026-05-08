/**
 * Firebase cross-device sync for progress data.
 * Uses Firestore REST API directly (bypasses SDK WebChannel issues).
 * Users remain anonymous unless they opt in to create an account.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth"
import { auth } from "./firebase"
import { getProgress, saveProgress, type ProgressState } from "./progress"

export interface SyncUser {
  id: string
  email: string
}

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

async function firestoreGet(userId: string, idToken: string): Promise<ProgressState | null> {
  const res = await fetch(`${FIRESTORE_BASE}/user_progress/${userId}`, {
    headers: { Authorization: `Bearer ${idToken}` },
  })
  if (res.status === 404) return null
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Firestore GET ${res.status}: ${text}`)
  }
  const doc = await res.json()
  const raw = doc.fields?.progress_json?.stringValue
  if (!raw) return null
  return JSON.parse(raw) as ProgressState
}

async function firestorePatch(userId: string, idToken: string, state: ProgressState): Promise<void> {
  const res = await fetch(`${FIRESTORE_BASE}/user_progress/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        progress_json: { stringValue: JSON.stringify(state) },
        updated_at: { stringValue: new Date().toISOString() },
      },
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Firestore PATCH ${res.status}: ${text}`)
  }
}

export async function getCurrentUser(): Promise<SyncUser | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user?.email) {
        resolve({ id: user.uid, email: user.email })
      } else {
        resolve(null)
      }
    })
  })
}

export async function signUp(email: string, password: string): Promise<{ error: string | null }> {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    await pushProgressToCloud()
    return { error: null }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Signup failed"
    if (message.includes("auth/email-already-in-use")) return { error: "An account with this email already exists. Try signing in." }
    if (message.includes("auth/weak-password")) return { error: "Password must be at least 6 characters." }
    if (message.includes("auth/invalid-email")) return { error: "Please enter a valid email address." }
    return { error: message }
  }
}

export async function signIn(email: string, password: string): Promise<{ error: string | null }> {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    await pullProgressFromCloud()
    return { error: null }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Sign in failed"
    if (message.includes("auth/invalid-credential") || message.includes("auth/wrong-password")) return { error: "Incorrect email or password." }
    if (message.includes("auth/user-not-found")) return { error: "No account found with this email." }
    if (message.includes("auth/too-many-requests")) return { error: "Too many attempts. Please wait a moment and try again." }
    return { error: message }
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth)
}

export async function pushProgressToCloud(): Promise<{ error: string | null }> {
  const user = auth.currentUser
  if (!user) return { error: "Not signed in" }

  try {
    const idToken = await user.getIdToken()
    const state = getProgress()
    await firestorePatch(user.uid, idToken, state)
    return { error: null }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[sync] push failed:", err)
    return { error: msg }
  }
}

export async function pullProgressFromCloud(): Promise<{ error: string | null }> {
  const user = auth.currentUser
  if (!user) return { error: "Not signed in" }

  try {
    const idToken = await user.getIdToken()
    const cloudState = await firestoreGet(user.uid, idToken)

    if (!cloudState) {
      // No cloud data yet — push local progress up
      return await pushProgressToCloud()
    }

    const localState = getProgress()
    const merged: ProgressState = {
      ...localState,
      xp: Math.max(localState.xp, cloudState.xp ?? 0),
      streak: Math.max(localState.streak, cloudState.streak ?? 0),
      streakLastDate: localState.streakLastDate ?? cloudState.streakLastDate,
      lastVisited: localState.lastVisited ?? cloudState.lastVisited,
      badges: Array.from(new Set([...(localState.badges ?? []), ...(cloudState.badges ?? [])])),
      unlockedRewards: Array.from(new Set([...(localState.unlockedRewards ?? []), ...(cloudState.unlockedRewards ?? [])])),
      modules: mergeModules(localState.modules, cloudState.modules ?? {}),
    }

    saveProgress(merged)
    return { error: null }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[sync] pull failed:", err)
    return { error: msg }
  }
}

function mergeModules(
  local: ProgressState["modules"],
  cloud: ProgressState["modules"]
): ProgressState["modules"] {
  const merged = { ...local }
  for (const [moduleId, cloudMod] of Object.entries(cloud)) {
    if (!merged[moduleId]) {
      merged[moduleId] = cloudMod
    } else {
      const mergedLessons = { ...merged[moduleId].lessons }
      for (const [lessonId, cloudLesson] of Object.entries(cloudMod.lessons)) {
        if (cloudLesson.completed && !mergedLessons[lessonId]?.completed) {
          mergedLessons[lessonId] = cloudLesson
        }
      }
      merged[moduleId] = {
        completed: merged[moduleId].completed || cloudMod.completed,
        completedAt: merged[moduleId].completedAt ?? cloudMod.completedAt,
        lessons: mergedLessons,
      }
    }
  }
  return merged
}
