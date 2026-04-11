/**
 * Centralised site constants.
 * Keep every public-facing string (SEO, structured data, contact, social)
 * here so rebrands / domain changes are a single-file edit.
 */

export const SITE = {
  name: "HexLab Software",
  legalName: "Oreste Acacia",
  role: "Full Stack Developer",
  tagline: "Ingegneria Full Stack ad Alta Precisione",
  heroHeadlineLead: "Ingegneria Full Stack",
  heroHeadlineAccent: "ad Alta Precisione.",
  heroSubtitle:
    "Progetto sistemi scalabili, infrastrutture resilienti e interfacce utente intuitive per le sfide tecnologiche di domani.",
  heroWhoamiRole: "Full Stack Engineer & Cloud Architect",
  heroStack: {
    backend: ["Laravel", "Node.js", "Python", "PostgreSQL"],
    frontend: ["React", "Next.js", "TypeScript", "Tailwind"],
    mobile: ["iOS", "Android", "React Native"],
    ai: ["LLM", "RAG", "Agents", "OpenAI", "Anthropic"],
    devops: ["AWS", "Vercel", "Docker", "CI/CD"],
  },
  nav: [
    { href: "#stack", label: "Competenze" },
    { href: "#projects", label: "Progetti" },
    { href: "#contact", label: "Contatti" },
  ],
  bookingCta: "Prenota call",
  booking: {
    heading: "Parliamo del tuo prossimo progetto",
    subtitle:
      "Seleziona uno slot libero dal mio calendario per una consulenza tecnica o per discutere di opportunità di collaborazione.",
    footer: "Powered by Cal.com · Calendario sincronizzato in tempo reale",
  },
  contact: {
    heading: "Iniziamo un Progetto",
    subtitle:
      "Invia un messaggio diretto per approfondire collaborazioni tecniche o consulenze.",
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
          "Descrivi brevemente il tuo progetto o la tua richiesta...",
      },
    },
  },
  projects: {
    heading: "Open Source Projects",
    cta: "Vedi tutti su GitHub",
  },
  description:
    "HexLab Software è lo studio di Oreste Acacia: ingegneria full stack su misura — web, mobile, AI, e-commerce e cloud. Dal 2011 trasformo idee in prodotti software affidabili e scalabili.",
  keywords: [
    "HexLab Software",
    "Oreste Acacia",
    "full stack developer",
    "sviluppo software Messina",
    "freelance developer Italia",
    "React Next.js",
    "Laravel PHP",
    "sviluppo iOS Android",
    "intelligenza artificiale",
    "e-commerce",
    "WooCommerce",
    "PrestaShop",
    "Shopify",
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
