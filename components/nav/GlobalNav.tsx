"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalNav() {
  const pathname = usePathname();

  return (
    <nav
      className="w-full border-b sticky top-0 z-40"
      style={{
        background: "rgba(5,5,5,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-12">
        <Link
          href="/"
          className="text-sm font-bold font-display transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          epiphany.help
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/modules"
            className="text-xs font-semibold transition-colors"
            style={{
              color: pathname.startsWith("/modules") ? "var(--text-primary)" : "var(--text-muted)",
            }}
          >
            Modules
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold transition-colors"
            style={{
              color: pathname === "/dashboard" ? "var(--text-primary)" : "var(--text-muted)",
            }}
          >
            Dashboard
          </Link>
          <Link
            href="/rewards"
            className="text-xs font-semibold transition-colors"
            style={{
              color: pathname === "/rewards" ? "var(--text-primary)" : "var(--text-muted)",
            }}
          >
            Rewards
          </Link>
        </div>
      </div>
    </nav>
  );
}
