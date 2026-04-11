import { SITE } from "@/lib/site";

/**
 * HexLab custom logo — a hexagon with an inscribed "HX" monogram built from
 * terminal-bracket strokes. Single inline SVG so it ships zero requests and
 * scales crisply. Uses currentColor so it inherits the surrounding text color.
 */
export function Logo({
  className = "",
  withWordmark = true,
  size = 36,
}: {
  className?: string;
  withWordmark?: boolean;
  size?: number;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label={SITE.name}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        <path
          d="M24 2 L42 13 L42 35 L24 46 L6 35 L6 13 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
        <path
          d="M24 6 L38.5 14.5 L38.5 33.5 L24 42 L9.5 33.5 L9.5 14.5 Z"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        {/* H stroke */}
        <path
          d="M16 17 L16 31 M16 24 L26 24 M26 17 L26 31"
          stroke="var(--color-phosphor)"
          strokeWidth="2"
          strokeLinecap="square"
        />
        {/* X / bracket accent */}
        <path
          d="M30 17 L34 24 L30 31"
          stroke="var(--color-phosphor)"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
      </svg>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-medium tracking-tight text-ink">
            HexLab
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            software
          </span>
        </span>
      )}
    </span>
  );
}
