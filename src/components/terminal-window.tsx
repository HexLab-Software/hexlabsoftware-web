import type { ReactNode } from "react";

/**
 * Reusable "terminal card" primitive from the design system.
 * Uses tonal layering (not borders) and the Unix traffic-light dots.
 * `path` is the fake breadcrumb shown in the header (e.g. `~/oreste/about.ts`).
 */
export function TerminalWindow({
  path,
  children,
  className = "",
  tone = "raised",
}: {
  path: string;
  children: ReactNode;
  className?: string;
  tone?: "raised" | "flat";
}) {
  const bg =
    tone === "raised"
      ? "bg-[color:var(--color-surface-2)]"
      : "bg-[color:var(--color-surface-1)]";
  return (
    <div
      className={`relative ${bg} shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex items-center gap-2 bg-[color:var(--color-surface-5)] px-4 py-3 font-mono text-[11px] text-ink-dim">
        <span
          aria-hidden
          className="flex gap-1.5"
        >
          <span className="block size-2.5 bg-[#ff5f57]" />
          <span className="block size-2.5 bg-[#febc2e]" />
          <span className="block size-2.5 bg-[color:var(--color-phosphor)]" />
        </span>
        <span className="ml-3 truncate">{path}</span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
