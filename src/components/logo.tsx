import { SITE } from "@/lib/site";

/**
 * HexLab brand mark — stylised "H" monogram paired with a right bracket.
 * Reproduced as inline SVG from the reference asset `logo-hexlab.png`.
 *
 * `size` is the height in px; the width auto-scales from the 114×60 viewBox
 * so the glyph keeps its native ~1.9:1 aspect ratio in every slot it's used.
 */
export function Logo({
  className = "",
  size = 36,
  showWordmark = true,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  const markWidth = Math.round(size * (114 / 60));
  return (
    <span
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label={SITE.name}
    >
      <svg
        width={markWidth}
        height={size}
        viewBox="0 0 114 60"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        role="img"
        aria-hidden="true"
      >
        {/* "H" monogram — single outlined path so corner joins stay clean */}
        <path
          d="M2 2 L20 2 L20 22 L40 22 L40 2 L58 2 L58 58 L40 58 L40 38 L20 38 L20 58 L2 58 Z"
          fill="#e2e8f0"
          stroke="#475569"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
        {/* Right bracket — flat top/bottom + quadratic-bezier outer curve */}
        <path
          d="M72 10 L90 10 Q112 30 90 50 L72 50 Z"
          fill="#e2e8f0"
          stroke="#475569"
          strokeWidth="1.5"
          strokeLinejoin="miter"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-mono text-[15px] font-bold tracking-tight text-slate-100">
            HexLab
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
            software
          </span>
        </span>
      )}
    </span>
  );
}
