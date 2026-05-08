"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { signUp, signIn, signOut, type SyncUser } from "@/lib/sync";

type Mode = "idle" | "signup" | "signin";

export default function AccountSync() {
  const [user, setUser] = useState<SyncUser | null>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<"signup" | "signin" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.email) {
        setUser({ id: firebaseUser.uid, email: firebaseUser.email });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!mounted) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = mode === "signup"
      ? await signUp(email, password)
      : await signIn(email, password);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      const isSignIn = mode === "signin";
      setSuccess(isSignIn ? "signin" : "signup");
      setMode("idle");
      if (isSignIn) {
        setTimeout(() => window.location.reload(), 1200);
      } else {
        setTimeout(() => setSuccess(null), 4000);
      }
    }
  }

  async function handleSignOut() {
    await signOut();
  }

  // Signed in
  if (user) {
    return (
      <div className="rounded-xl p-4 flex items-center justify-between" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#4CD929" }}>✓ Progress synced</p>
          <p className="text-xs" style={{ color: "rgba(240, 239, 235, 0.4)" }}>{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="text-xs transition-colors"
          style={{ color: "rgba(240, 239, 235, 0.3)" }}
        >
          Sign out
        </button>
      </div>
    );
  }

  // Success flash
  if (success) {
    return (
      <div className="rounded-xl p-4 text-center" style={{ background: "rgba(38, 137, 12, 0.1)", border: "1px solid rgba(38, 137, 12, 0.2)" }}>
        <p className="text-sm font-semibold" style={{ color: "#4CD929" }}>
          {success === "signup" ? "✓ Account created! Progress saved." : "✓ Signed in! Loading your progress..."}
        </p>
      </div>
    );
  }

  // Form mode
  if (mode !== "idle") {
    return (
      <div className="rounded-xl p-5" style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm font-display" style={{ color: "#F0EFEB" }}>
            {mode === "signup" ? "Save progress across devices" : "Sign in to your account"}
          </h3>
          <button
            onClick={() => { setMode("idle"); setError(null); }}
            className="text-lg leading-none"
            style={{ color: "rgba(240, 239, 235, 0.3)" }}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1368CE]"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0EFEB" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1368CE]"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#F0EFEB" }}
          />
          {error && <p className="text-xs" style={{ color: "#FF6B7A" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-medium py-2 rounded-lg text-sm disabled:opacity-50 transition-colors"
            style={{ background: "#1368CE" }}
          >
            {loading ? "..." : mode === "signup" ? "Create Account" : "Sign In"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          className="text-xs mt-3 w-full text-center transition-colors"
          style={{ color: "rgba(240, 239, 235, 0.4)" }}
        >
          {mode === "signup" ? "Already have an account? Sign in" : "No account? Create one free"}
        </button>
      </div>
    );
  }

  // Default — invite to sync
  return (
    <div className="rounded-xl p-4 text-center" style={{ background: "#0A0A0A", border: "1px dashed rgba(255,255,255,0.1)" }}>
      <p className="text-sm mb-3" style={{ color: "rgba(240, 239, 235, 0.5)" }}>
        Want your progress on all devices?
      </p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setMode("signup")}
          className="text-xs text-white font-medium px-4 py-2 rounded-lg transition-colors"
          style={{ background: "#1368CE" }}
        >
          Save Progress
        </button>
        <button
          onClick={() => setMode("signin")}
          className="text-xs font-medium px-4 py-2 rounded-lg transition-colors"
          style={{ color: "rgba(240, 239, 235, 0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
