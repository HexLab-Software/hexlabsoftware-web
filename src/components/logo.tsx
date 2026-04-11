import { SITE } from "@/lib/site";

/**
 * HexLab custom logo — hexagon with inscribed "HX" glyph.
 * Restyled to match the Stitch screen palette: slate strokes on the
 * navy nav bar, no phosphor accents.
 */
export function Logo({
  className = "",
  size = 40,
}: {
  className?: string;
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
          stroke="#858fac"
          strokeWidth="1.5"
          strokeLinejoin="miter"
          fill="#1e2840"
        />
        <path
          d="M24 7 L37.5 15 L37.5 33 L24 41 L10.5 33 L10.5 15 Z"
          stroke="#858fac"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <path
          d="M16 17 L16 31 M16 24 L26 24 M26 17 L26 31"
          stroke="#e2e8f0"
          strokeWidth="2"
          strokeLinecap="square"
        />
        <path
          d="M30 17 L34 24 L30 31"
          stroke="#858fac"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-mono text-[15px] font-bold tracking-tight text-slate-100">
          HexLab
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
          software
        </span>
      </span>
    </span>
  );
}
