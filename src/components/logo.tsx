import { SITE } from "@/lib/site";

/**
 * HexLab brand mark.
 *
 * The two paths are traced (potrace) from the official asset
 * https://hexlabsoftware.it/files/uploads/logo-dark@2x.png — so the glyph
 * is pixel-faithful to the legacy site's logo and not a hand-drawn
 * approximation. The wrapping `<g>` transform flips Y and scales down
 * the raw potrace coordinates into a clean 178×100 viewBox.
 *
 * `size` is the rendered height in px; width auto-scales from the
 * native 1.78:1 aspect so the mark never stretches.
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
  const markWidth = Math.round(size * (178 / 100));
  return (
    <span
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label={SITE.name}
    >
      <svg
        width={markWidth}
        height={size}
        viewBox="0 0 178 100"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        <g
          transform="translate(0 100) scale(0.1 -0.1)"
          fill="currentColor"
          stroke="none"
        >
          <path d="M323 930 c-70 -14 -141 -51 -178 -91 l-35 -39 0 -370 0 -370 47 6 c119 15 210 56 249 114 21 30 24 46 24 122 l0 88 420 0 420 0 0 95 0 95 -420 0 -420 0 0 180 0 180 -32 -1 c-18 -1 -52 -5 -75 -9z" />
          <path d="M1340 584 c0 -200 6 -225 70 -269 48 -33 148 -65 206 -65 l44 0 0 185 0 184 -32 36 c-40 46 -92 73 -177 91 -122 25 -111 41 -111 -162z" />
        </g>
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
