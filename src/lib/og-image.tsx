import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

/**
 * Shared Open Graph / Twitter card generator.
 *
 * Uses Next.js' built-in `ImageResponse` (backed by @vercel/og) to render
 * a 1200×630 PNG at the edge. Fonts are bundled as TTFs under
 * `src/lib/assets/` and loaded via `new URL(..., import.meta.url)` so
 * they ship with the function and don't hit a CDN at request time.
 *
 * The same module is re-exported from both `app/opengraph-image.tsx` and
 * `app/twitter-image.tsx` to produce identical cards for both platforms.
 */

export const alt = `${SITE.legalName} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#08132a";
const SURFACE = "#1e2840";
const PRIMARY = "#6d7793";
const PRIMARY_SOFT = "#858fac";
const ORANGE = "#feb069";
const INK = "#ffffff";
const INK_MUTED = "#94a3b8";
const INK_DIM = "#64748b";

/**
 * Read a TTF from the project's asset folder at module-load time.
 * `import.meta.url`-based fetch isn't supported by Turbopack during
 * static prerender, and this route is Node-runtime anyway, so we read
 * the binary directly from disk. `outputFileTracingIncludes` in
 * `next.config.ts` makes sure the TTF is traced into the serverless
 * function bundle on Vercel.
 */
function readFont(name: string): Buffer {
  return readFileSync(join(process.cwd(), "src/lib/assets", name));
}

const interBold = readFont("Inter-Bold.ttf");
const interExtraBold = readFont("Inter-ExtraBold.ttf");

export default async function Image() {

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "80px 90px",
          background: NAVY,
          backgroundImage: `
            radial-gradient(circle at 18% 18%, rgba(133,143,172,0.18) 0%, transparent 55%),
            radial-gradient(circle at 82% 82%, rgba(254,176,105,0.10) 0%, transparent 55%)
          `,
          color: INK,
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* Dot-grid layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #6d7793 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: 0.08,
            display: "flex",
          }}
        />

        {/* Top row: logo mark + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontWeight: 800,
          }}
        >
          <svg
            width={96}
            height={54}
            viewBox="0 0 178 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(0 100) scale(0.1 -0.1)" fill="#e2e8f0">
              <path d="M323 930 c-70 -14 -141 -51 -178 -91 l-35 -39 0 -370 0 -370 47 6 c119 15 210 56 249 114 21 30 24 46 24 122 l0 88 420 0 420 0 0 95 0 95 -420 0 -420 0 0 180 0 180 -32 -1 c-18 -1 -52 -5 -75 -9z" />
              <path d="M1340 584 c0 -200 6 -225 70 -269 48 -33 148 -65 206 -65 l44 0 0 185 0 184 -32 36 c-40 46 -92 73 -177 91 -122 25 -111 41 -111 -162z" />
            </g>
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1,
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: -0.5,
                color: INK,
              }}
            >
              HexLab
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: INK_DIM,
              }}
            >
              software
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flexGrow: 1, display: "flex" }} />

        {/* Headline block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 22,
              fontWeight: 700,
              color: PRIMARY_SOFT,
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 48,
                height: 2,
                background: PRIMARY_SOFT,
              }}
            />
            {SITE.legalName} · {SITE.address.locality}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -3,
              color: INK,
            }}
          >
            Ingegneria Full Stack&nbsp;
            <span
              style={{
                display: "flex",
                fontStyle: "italic",
                color: ORANGE,
              }}
            >
              ad Alta Precisione.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              color: INK_MUTED,
              maxWidth: 980,
              lineHeight: 1.35,
            }}
          >
            Progetto sistemi scalabili, infrastrutture resilienti e interfacce
            utente intuitive — dal 2011.
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flexGrow: 1, display: "flex" }} />

        {/* Bottom row: domain + terminal prompt */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 700,
            color: INK_DIM,
            paddingTop: 28,
            borderTop: `2px solid ${SURFACE}`,
          }}
        >
          <div style={{ display: "flex", color: INK }}>hexlabsoftware.it</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: PRIMARY,
            }}
          >
            <span>{">"}_</span>
            <span>Full Stack · Mobile · AI · Cloud</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, style: "normal", weight: 700 },
        { name: "Inter", data: interExtraBold, style: "normal", weight: 800 },
        { name: "Inter", data: interBold, style: "italic", weight: 700 },
      ],
    },
  );
}
