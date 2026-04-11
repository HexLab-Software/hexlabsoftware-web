# hexlabsoftware.it

Sito istituzionale di **HexLab Software** — Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript, deployato su Vercel.

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

Senza le env vars il sito gira lo stesso: il form `/api/contact` risponde `server-misconfigured` e la verifica reCAPTCHA viene saltata (comportamento intenzionale per il dev locale).

## Environment variables

| Name                              | Required | Notes                                                         |
| --------------------------------- | :------: | ------------------------------------------------------------- |
| `BREVO_API_KEY`                   | ✓        | Generata in https://app.brevo.com/settings/keys/api           |
| `BREVO_SENDER_EMAIL`              | ✓        | Un sender verificato in Brevo                                 |
| `BREVO_SENDER_NAME`               |          | Default: `HexLab Software`                                    |
| `CONTACT_TO_EMAIL`                |          | Default: `assistenza@hexlabsoftware.it`                       |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`  | ✓ (prod) | reCAPTCHA Enterprise site key — pubblica, esposta al browser  |
| `RECAPTCHA_PROJECT_ID`            | ✓ (prod) | GCP project id che possiede la key reCAPTCHA                  |
| `RECAPTCHA_API_KEY`               | ✓ (prod) | GCP API key ristretta alla reCAPTCHA Enterprise API           |
| `NEXT_PUBLIC_POSTHOG_KEY`         |          | PostHog project key (`phc_…`) — unset per disabilitare        |

Le variabili devono essere settate nel progetto Vercel prima del deploy. Le `NEXT_PUBLIC_*` sono inline a build time, quindi un cambio richiede un redeploy.

## Architecture notes

- **One-page site**. Tutte le sezioni vivono in `src/components/sections/*`, composte in `src/app/page.tsx`. Nessuna route dinamica oltre a `/api/contact`.
- **Design tokens** (colori, font, spacing) in `@theme inline {…}` dentro `src/app/globals.css`. In Tailwind v4 non esiste `tailwind.config.*`.
- **Site constants** (contatti, social, keywords, Cal username) centralizzate in `src/lib/site.ts` — single-file edit per rebrand / cambio P.IVA.
- **Contact form**: schema di validazione condiviso in `src/lib/contact-schema.ts`, eseguito sia sul client che nell'API route. Brevo viene chiamato solo server-side.
- **reCAPTCHA Enterprise**: l'endpoint `recaptchaenterprise.googleapis.com/v1/projects/{id}/assessments` richiede che la GCP API key non abbia restrizioni HTTP referrer (le call sono server-to-server dalla serverless function).
- **PostHog reverse proxy**: `next.config.ts` riscrive `/ingest/*` verso `us.i.posthog.com` per bypassare gli ad blocker che altrimenti fanno perdere eventi.
- **SEO**: OG image e Twitter image generate dinamicamente in `src/app/opengraph-image.tsx` / `twitter-image.tsx`. JSON-LD (Person + Organization + WebSite) in `src/components/json-ld.tsx`. 308 redirect dalle vecchie URL PHP sono in `next.config.ts`.

## Scripts

```bash
npm run dev     # dev locale con Turbopack
npm run build   # build prod + TS type-check + static generation
npm run start   # serve della build di produzione
npm run lint    # ESLint (next lint è stato rimosso in Next 16)
```

`npm run build` è il gate canonico pre-commit: fa girare TypeScript su tutto il tree e fallisce su qualunque errore di tipo.

## License

All rights reserved © Oreste Acacia — HexLab Software.
