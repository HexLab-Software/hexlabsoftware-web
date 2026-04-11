# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Next.js 16 — read the local docs first

`AGENTS.md` is not boilerplate: this project runs **Next.js 16 (App Router, Turbopack, React 19.2)**, which has breaking changes vs. the training-data defaults. Before touching routing, metadata, data fetching, `params`/`searchParams`, `middleware`, image handling or caching APIs, read the relevant page in `node_modules/next/dist/docs/01-app/` (especially `02-guides/upgrading/version-16.md`). `middleware` is now `proxy`, `next lint` has been removed, `params` / `searchParams` / `cookies()` / `headers()` are always async, `sitemap.ts` receives an async `id`, and several image-config defaults changed.

## Commands

```bash
npm run dev      # local dev server (Turbopack) at http://localhost:3000
npm run build    # production build: compile + TypeScript type-check + static generation
npm run start    # serve the production build (after `build`)
npm run lint     # ESLint directly — `next lint` is removed in v16
```

There is no test runner wired up. `npm run build` is the canonical pre-commit gate: it runs TypeScript over the whole tree and fails the build on any type error, so treat a clean `build` the same way you'd treat a green test suite.

### Env vars for local dev

Copy `.env.example` → `.env.local` and fill in Brevo + reCAPTCHA values. Without them the `/api/contact` route will still run but email sending and captcha verification are skipped (verification returns `{ status: "disabled" }` when secrets are missing — this is intentional for local dev, not a bug).

## Architecture

**One-page marketing site** for HexLab Software (hexlabsoftware.it). Everything renders from a single route (`src/app/page.tsx`) composing section components; internal navigation is hash-based anchors. There are no dynamic routes beyond `/api/contact`.

### Content flow

Section composition lives in `src/app/page.tsx`. Each section is its own file under `src/components/sections/` and is almost fully self-contained — it reads shared constants from `src/lib/site.ts` and, for the projects section, from `src/lib/projects.ts`. **All copy, contact details, URLs and CTA targets that appear on the page go through `src/lib/site.ts`** — rebrands or P.IVA changes should be a single-file edit.

### Design system

The design is a 1:1 reproduction of the Stitch screen *"Portfolio Senior Engineer - With Custom Logo"* (project `17167457693303436370`, screen `2252ca781b1d456daf30eceb5b91505c`). The **source of truth is the rendered HTML of that screen**, not the `designMd` markdown attached to the project — an earlier pass followed the markdown and produced the wrong colour palette. If the design needs to change, pull the screen HTML/screenshot again via the Stitch MCP before proposing anything.

Tokens live in `src/app/globals.css` inside `@theme inline { … }` (Tailwind v4 — **there is no `tailwind.config.*` file**). The palette is navy `#08132a` body / slate-blue `#6d7793` primary / warm italic `#feb069` secondary / rounded corners / `glass-panel` and `terminal-glow` helpers. Icons are Material Symbols Outlined loaded via a plain `<link>` in `app/layout.tsx` (next/font doesn't handle icon fonts well); the `<Icon>` component in `src/components/icon.tsx` is the only place that references the icon class.

### SEO, JSON-LD and analytics

- `src/app/layout.tsx` exports the full Next.js `metadata` object (OG, Twitter, canonical, hreflang `it-IT`, Google Search Console verification).
- `src/app/layout.tsx` also mounts `<Analytics />` and `<SpeedInsights />` from `@vercel/analytics/next` and `@vercel/speed-insights/next` — these piggyback on Vercel's built-in tracking (no env vars, enabled automatically on the Vercel deployment) and run alongside PostHog.
- `src/components/json-ld.tsx` server-renders a Person + Organization + WebSite graph via `next/script`. The payload is a typed literal — never pass user input through it. The file uses `next/script` with a children string specifically to avoid the direct inline-HTML React prop (a local security hook rejects writes containing that token).
- `src/app/sitemap.ts` + `src/app/robots.ts` use the App Router file conventions. Remember `sitemap.ts`'s `id` parameter is async in v16.
- `src/components/posthog-provider.tsx` wraps the `useSearchParams`-reading pageview tracker in `<Suspense>`. If you touch it, keep the Suspense boundary — without it `/_not-found` fails prerender with a CSR bailout error. **Init must stay inside `PageviewTracker`'s own effect (via `ensurePostHog()`), not in the parent**: React runs child effects before parent effects, so a parent-driven init flag would be `false` when the tracker first fires, and on this one-page site no later navigation ever re-runs the effect — the initial pageview would silently never capture.
- PostHog is reverse-proxied through `/ingest` (`next.config.ts` rewrites → `us.i.posthog.com` + `us-assets.i.posthog.com`) so ad blockers that blacklist `*.i.posthog.com` don't drop events. The client-side `api_host` in `SITE.posthog` is `/ingest`, not the PostHog domain — don't "fix" it back.

### Contact form pipeline

The pipeline has four pieces that must stay in sync:

1. **`src/lib/contact-schema.ts`** — zero-dep validator. The `ContactPayload` type + `validateContact` function run on both sides of the wire. **Adding or renaming a field requires editing this file AND the Brevo payload in `/api/contact/route.ts` AND the form fields in `src/components/sections/contact.tsx` in the same commit** — there is no other layer reconciling them.
2. **`src/components/sections/contact.tsx`** (client component) — runs `validateContact` locally, fetches a fresh reCAPTCHA token via `executeRecaptcha("contact")`, POSTs JSON to `/api/contact`, and displays per-field errors from the 422 response. Anti-spam also includes a honeypot `company` input and a fill-time heuristic keyed on `renderedAt`.
3. **`src/lib/recaptcha-client.ts`** — lazy-loads `grecaptcha/api.js` on first form focus via `primeRecaptcha()`; the bundle never touches LCP.
4. **`src/app/api/contact/route.ts`** — verifies the token with `verifyRecaptcha()` (rejecting on `failed` / `missing-token`), re-runs `validateContact` as the source of truth, HTML-escapes every field, and POSTs to Brevo's transactional HTTP API (`/v3/smtp/email`). Brevo is called via plain `fetch` with a 10s `AbortSignal.timeout`.

### reCAPTCHA — Enterprise, not classic

`src/lib/recaptcha-server.ts` calls **reCAPTCHA Enterprise** (`recaptchaenterprise.googleapis.com/v1/projects/{id}/assessments?key=…`), not the classic `siteverify` endpoint. Google no longer issues classic v3 secret keys for new sites — keys live inside a GCP project. The three required env vars are `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_PROJECT_ID`, and `RECAPTCHA_API_KEY` (a GCP API key restricted to the reCAPTCHA Enterprise API). The client flow (`grecaptcha.execute`) is identical to classic v3 — only server verification changed. Do not re-introduce a `RECAPTCHA_SECRET_KEY` var.

### Cal.com

Booking uses `@calcom/embed-react` (free tier, no CalProvider, no OAuth). An earlier spec referenced `@calcom/atoms` `BookerEmbed`, which requires the paid Platform plan plus OAuth — if that ever gets adopted, only `src/components/sections/booking.tsx` needs to change. The `calLink` is built from `SITE.cal.username` / `SITE.cal.eventSlug`.

## Deployment

Target is **Vercel** with the custom domain `hexlabsoftware.it`. Vercel env vars must mirror `.env.example`; `NEXT_PUBLIC_*` vars are inlined at build time, so changing them requires a redeploy, not just a settings update.
