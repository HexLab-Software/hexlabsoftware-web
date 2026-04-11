/**
 * Thin wrapper around Google's Material Symbols Outlined font.
 * The icon name itself is rendered as text — the font ligatures turn it
 * into the corresponding glyph. We load the font in app/layout.tsx.
 */
export function Icon({
  name,
  className = "",
  size = 24,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      data-icon={name}
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  );
}
