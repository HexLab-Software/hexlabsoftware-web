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
    key: "phc_duH8e86Om4Ao7A7tyMND4KQWJFYe1ZMBo1iDfbfpGwl",
    host: "https://app.posthog.com",
  },
} as const;

export type Site = typeof SITE;
