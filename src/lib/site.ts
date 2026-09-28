/**
 * Centralised site constants.
 * Keep every public-facing string (SEO, structured data, contact, social)
 * here so rebrands / domain changes are a single-file edit.
 */

export const SITE = {
  name: "HexLab Software",
  legalName: "Oreste Acacia",
  role: "Senior Software Engineer",
  tagline: "Software engineering senior · Agenti AI con metodo",
  heroHeadlineLead: "Software engineering senior.",
  heroHeadlineAccent: "Agenti AI con metodo.",
  heroSubtitle:
    "Sviluppo prodotti con Laravel, React/Next.js e React Native. Aiuto i team a integrare coding agent nel lavoro reale: requisiti chiari, review indipendente, test automatici e verifica E2E.",
  heroWhoamiRole: "Freelance Senior Software Engineer",
  heroStack: {
    backend: ["Laravel", "PHP", "Python", "System design"],
    web: ["React", "Next.js", "TypeScript"],
    mobile: ["React Native"],
    workflow: ["Requisiti", "Implementazione", "Review indipendente", "Test", "Playwright E2E", "Correzione"],
  },
  heroPrimaryCta: "Parliamo del tuo progetto",
  heroSecondaryCta: "Come lavoro",
  nav: [
    { href: "#stack", label: "Competenze" },
    { href: "#workflow", label: "Come lavoro" },
    { href: "#projects", label: "Progetti" },
    { href: "#contact", label: "Contatti" },
  ],
  workflow: {
    heading: "Come lavoro con i coding agent",
    steps: [
      { title: "Requisiti", description: "Definisco cosa va costruito e come verificarlo." },
      { title: "Implementazione e review", description: "Un agente implementa; un reviewer indipendente controlla il risultato rispetto ai requisiti." },
      { title: "Verifica", description: "Test unitari e di integrazione, poi Playwright per i flussi UI e funzionali pertinenti." },
      { title: "Correzione", description: "I problemi rientrano nel ciclo finché la soluzione soddisfa le verifiche. La responsabilità tecnica resta umana." },
    ],
    closing: "Non misuro il lavoro in codice generato: mi interessa ciò che supera review e verifiche.",
  },
  bookingCta: "Prenota una call",
  booking: {
    heading: "Parliamo del software che devi costruire — o del processo con cui lo costruite",
    subtitle:
      "Possiamo discutere di sviluppo Laravel/React, qualità del codice o adozione dei coding agent nel tuo team.",
    footer: "Powered by Cal.com · Calendario sincronizzato in tempo reale",
  },
  contact: {
    heading: "Raccontami il contesto",
    subtitle:
      "Che cosa state costruendo, dove si blocca il team e quale risultato cercate?",
    submit: "Invia Messaggio",
    submitting: "Invio in corso…",
    success: "➜ Messaggio ricevuto. Ti scrivo a breve, grazie.",
    fields: {
      name: { label: "Nome", placeholder: "Inserisci il tuo nome" },
      email: { label: "Email", placeholder: "latua@email.com" },
      subject: { label: "Oggetto", placeholder: "Di cosa vogliamo parlare?" },
      message: {
        label: "Messaggio",
        placeholder:
          "Raccontami il progetto, il team o il processo su cui vuoi lavorare...",
      },
    },
  },
  projects: {
    heading: "Progetti pubblici",
    cta: "Vedi gli altri progetti su GitHub",
  },
  description:
    "Sono Oreste Acacia, Freelance Senior Software Engineer. Sviluppo software con Laravel, React e React Native e aiuto i team a integrare coding agent con review, test automatici e verifiche E2E.",
  keywords: [
    "HexLab Software",
    "Oreste Acacia",
    "Senior Software Engineer",
    "Laravel PHP",
    "React Next.js TypeScript",
    "React Native",
    "AI coding agent",
    "testing Playwright E2E",
  ],
  url: "https://hexlabsoftware.it",
  locale: "it_IT",
  lang: "it",
  email: "assistenza@hexlabsoftware.it",
  phone: "+393270674404",
  phoneDisplay: "+39 327 0674404",
  vat: "IT03461160834",
  address: {
    locality: "Messina",
    region: "Sicilia",
    country: "IT",
  },
  social: {
    facebook: "https://www.facebook.com/hexlabsoftware/",
    linkedin: "https://www.linkedin.com/in/oreste-acacia-37898157/",
    github: "https://github.com/Gybra",
    githubOrg: "https://github.com/HexLab-Software",
  },
  cal: {
    // Cal.com free embed (no Platform plan needed) — username and event slug
    // Full link: https://cal.com/oreste-acacia-jnmmbg/hexlab-software
    username: "oreste-acacia-jnmmbg",
    eventSlug: "hexlab-software",
  },
  posthog: {
    key: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "",
    // Reverse-proxied in next.config.ts to bypass tracker blockers.
    host: "/ingest",
    uiHost: "https://us.posthog.com",
  },
} as const;

export type Site = typeof SITE;
