# hexlabsoftware.it

Sito istituzionale di **HexLab Software** — Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript.

## Stack

| Layer        | Tech                                                       |
| ------------ | ---------------------------------------------------------- |
| Framework    | Next.js 16.2 (App Router, Turbopack)                       |
| Language     | TypeScript 5 (strict)                                      |
| Styling      | Tailwind CSS v4 (theme in `src/app/globals.css`)           |
| Booking      | [`@calcom/embed-react`](https://cal.com/docs/embed/install) (free tier) |
| Mail         | [Brevo transactional HTTP API](https://developers.brevo.com/reference/sendtransacemail) |
| Analytics    | PostHog (EU cloud)                                         |
| Deployment   | Vercel                                                     |

## Local development

```bash
cp .env.example .env.local   # fill in Brevo credentials
npm install
npm run dev                  # http://localhost:3000
```

## Environment variables

| Name                              | Required | Notes                                                         |
| --------------------------------- | :------: | ------------------------------------------------------------- |
| `BREVO_API_KEY`                   | ✓        | Generated at https://app.brevo.com/settings/keys/api          |
| `BREVO_SENDER_EMAIL`              | ✓        | A sender verified in Brevo                                    |
| `BREVO_SENDER_NAME`               |          | Defaults to `HexLab Software`                                 |
| `CONTACT_TO_EMAIL`                |          | Defaults to `assistenza@hexlabsoftware.it`                    |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`  | ✓ (prod) | reCAPTCHA v3 site key — public, exposed to the browser        |
| `RECAPTCHA_SECRET_KEY`            | ✓ (prod) | reCAPTCHA v3 secret — server-only, never prefix with `NEXT_PUBLIC_` |

These **must be set in the Vercel project settings** before deploy.

## SEO checklist

- [x] `metadata` API with OG + Twitter cards
- [x] JSON-LD (Person + Organization + WebSite) in `src/components/json-ld.tsx`
- [x] `sitemap.xml` and `robots.txt` generated dynamically
- [x] `hreflang="it-IT"` + canonical on every page
- [x] Google Search Console verification meta tag preserved from legacy site
- [ ] `og.png` (1200×630) — **TODO: add a rendered OG image to `/public/og.png`**

## Architecture notes

- **One-page site**. All sections live in `src/components/sections/*`, composed from `src/app/page.tsx`.
- **Design tokens** (colours, fonts, spacing) live in `@theme inline {…}` inside `src/app/globals.css`. No tailwind.config.* file in Tailwind v4.
- **Site constants** (contact, social, keywords, Cal username) centralised in `src/lib/site.ts` — single-file edit for rebrands.
- **Contact form**: shared validation schema in `src/lib/contact-schema.ts` runs on both client and `/api/contact` route handler. Brevo is called server-side only.
- **Spam defence**: honeypot input + minimum fill time heuristic — no captcha.

## Scripts

```bash
npm run dev     # local dev with Turbopack
npm run build   # prod build + TS type-check + static generation
npm run start   # serve the production build locally
npm run lint    # ESLint (next lint is removed in Next 16)
```

## License

All rights reserved © Oreste Acacia — HexLab Software.
