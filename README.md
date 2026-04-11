# hexlabsoftware.it

Marketing site for **HexLab Software** — Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript, deployed on Vercel.

## Stack

| Layer        | Tech                                                       |
| ------------ | ---------------------------------------------------------- |
| Framework    | Next.js 16.2 (App Router, Turbopack, React 19.2)           |
| Language     | TypeScript 5 (strict)                                      |
| Styling      | Tailwind CSS v4 (theme in `src/app/globals.css`)           |
| Booking      | [`@calcom/embed-react`](https://cal.com/docs/embed/install) (free tier) |
| Mail         | [Brevo transactional HTTP API](https://developers.brevo.com/reference/sendtransacemail) |
| Anti-spam    | reCAPTCHA Enterprise + honeypot + fill-time heuristic      |
| Analytics    | PostHog (reverse-proxied via `/ingest`) + Vercel Analytics + Speed Insights |
| Deployment   | Vercel                                                     |

## Local development

```bash
cp .env.example .env.local   # fill in credentials
npm install
npm run dev                  # http://localhost:3000
```

Without the env vars the site still runs: `/api/contact` responds with `server-misconfigured` and reCAPTCHA verification is skipped (intentional for local dev, not a bug).

## Environment variables

| Name                              | Required | Notes                                                         |
| --------------------------------- | :------: | ------------------------------------------------------------- |
| `BREVO_API_KEY`                   | ✓        | Generated at https://app.brevo.com/settings/keys/api          |
| `BREVO_SENDER_EMAIL`              | ✓        | A sender verified in Brevo                                    |
| `BREVO_SENDER_NAME`               |          | Defaults to `HexLab Software`                                 |
| `CONTACT_TO_EMAIL`                |          | Defaults to `assistenza@hexlabsoftware.it`                    |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`  | ✓ (prod) | reCAPTCHA Enterprise site key — public, shipped to the browser |
| `RECAPTCHA_PROJECT_ID`            | ✓ (prod) | GCP project id that owns the reCAPTCHA key                     |
| `RECAPTCHA_API_KEY`               | ✓ (prod) | GCP API key restricted to the reCAPTCHA Enterprise API         |
| `NEXT_PUBLIC_POSTHOG_KEY`         |          | PostHog project key (`phc_…`) — unset to disable analytics     |

These must be set in the Vercel project settings before deploy. `NEXT_PUBLIC_*` vars are inlined at build time, so changing them requires a redeploy.

## Architecture notes

- **One-page site**. All sections live in `src/components/sections/*`, composed from `src/app/page.tsx`. No dynamic routes other than `/api/contact`.
- **Design tokens** (colours, fonts, spacing) live in `@theme inline {…}` inside `src/app/globals.css`. Tailwind v4 has no `tailwind.config.*` file.
- **Site constants** (contact, social, keywords, Cal username) are centralised in `src/lib/site.ts` — single-file edit for rebrands or VAT number changes.
- **Contact form**: shared validation schema in `src/lib/contact-schema.ts` runs on both the client and the `/api/contact` route handler. Brevo is called server-side only.
- **reCAPTCHA Enterprise**: the `recaptchaenterprise.googleapis.com/v1/projects/{id}/assessments` endpoint requires that the GCP API key has no HTTP referrer restrictions — calls are server-to-server from the serverless function and carry no `Referer` header.
- **PostHog reverse proxy**: `next.config.ts` rewrites `/ingest/*` to `us.i.posthog.com` to bypass ad/tracker blockers that otherwise drop events for a meaningful share of visitors.
- **SEO**: OG image and Twitter image are generated dynamically in `src/app/opengraph-image.tsx` / `twitter-image.tsx`. JSON-LD (Person + Organization + WebSite) in `src/components/json-ld.tsx`. Legacy PHP URLs are 308-redirected in `next.config.ts`.

## Scripts

```bash
npm run dev     # local dev with Turbopack
npm run build   # prod build + TS type-check + static generation
npm run start   # serve the production build locally
npm run lint    # ESLint (next lint is removed in Next 16)
```

`npm run build` is the canonical pre-commit gate: it runs TypeScript over the whole tree and fails on any type error.

## License

All rights reserved © Oreste Acacia — HexLab Software.
