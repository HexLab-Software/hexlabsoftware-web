import type { ReactNode } from "react";

/**
 * Editorial section heading. Index label + display heading + optional lede.
 * Replaces the old "centered title + rule" pattern with asymmetric layout.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`grid gap-6 md:grid-cols-12 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      <div className="md:col-span-3">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-phosphor)]">
          <span className="inline-block h-px w-8 bg-[color:var(--color-phosphor)]" />
          {index} · {eyebrow}
        </p>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
          {title}
        </h2>
        {lede && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {lede}
          </p>
        )}
      </div>
    </div>
  );
}
