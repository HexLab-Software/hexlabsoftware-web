/**
 * Public projects ordered for the homepage; the first three are displayed.
 */

export type Project = {
  name: string;
  tagline: string;
  description: string;
  language: string;
  tags: readonly string[];
  href: string;
  org: string;
  /** visual identity: deterministic gradient pair + glyph for the card */
  glyph: string;
  hue: readonly [number, number];
};

export const PROJECTS: readonly Project[] = [
  {
    name: "pi-telegram-notifier",
    tagline: "Tooling per coding agent",
    description:
      "Estensione per Pi che invia notifiche Telegram al termine di una sessione agentica, con attenzione a privacy, test e integrazione nel workflow.",
    language: "TypeScript",
    tags: ["Pi", "Coding agents", "Tooling"],
    href: "https://github.com/Gybra/pi-telegram-notifier",
    org: "Gybra",
    glyph: "⌘",
    hue: [190, 220],
  },
  {
    name: "telegram-excerpt-prd-bot",
    tagline: "LLM-powered PRD extractor",
    description:
      "Trasforma conversazioni Telegram in PRD strutturati, per chiarire i requisiti prima dello sviluppo.",
    language: "Python",
    tags: ["LLM", "Telegram", "Agents"],
    href: "https://github.com/Gybra/telegram-excerpt-prd-bot",
    org: "Gybra",
    glyph: "✦",
    hue: [142, 135],
  },
  {
    name: "Stock-Market-App",
    tagline: "Laravel portfolio tracker",
    description:
      "Applicazione Laravel con API, bot Telegram, report automatici e test Pest per il monitoraggio di un portafoglio finanziario.",
    language: "PHP",
    tags: ["Laravel", "Fintech", "Telegram Bot"],
    href: "https://github.com/HexLab-Software/Stock-Market-App",
    org: "HexLab-Software",
    glyph: "◈",
    hue: [155, 120],
  },
  {
    name: "laravel-istat-foreign-countries",
    tagline: "Pacchetto Laravel ISTAT",
    description:
      "Importa e gestisce la base dati ISTAT dei paesi esteri (continenti, aree, stati, territori) con modelli Eloquent, codici ISO/ISTAT e comando Artisan.",
    language: "PHP",
    tags: ["Laravel", "Open Data", "Package"],
    href: "https://github.com/Gybra/laravel-istat-foreign-countries",
    org: "Gybra",
    glyph: "◇",
    hue: [118, 150],
  },
  {
    name: "Portfolio-Drawdown",
    tagline: "Drawdown calculation API",
    description:
      "Calcola il drawdown di un portfolio finanziario esponendo un endpoint HTTP, ideale come microservizio per dashboard di rischio.",
    language: "Python",
    tags: ["API", "Finance", "FastAPI"],
    href: "https://github.com/Gybra/Portfolio-Drawdown",
    org: "Gybra",
    glyph: "▲",
    hue: [135, 100],
  },
  {
    name: "rss-mailer",
    tagline: "Dockerized RSS→email relay",
    description:
      "Istanza Python containerizzata che riceve aggiornamenti da feed RSS e li inoltra via email. Perfetta per newsletter interne e monitoring leggero.",
    language: "Python",
    tags: ["Docker", "RSS", "Automation"],
    href: "https://github.com/Gybra/rss-mailer",
    org: "Gybra",
    glyph: "⌘",
    hue: [130, 160],
  },
  {
    name: "laravel-vat-eu-validator",
    tagline: "EU VAT number validator",
    description:
      "Package Laravel che valida partite IVA europee consultando direttamente il database centrale ec.europa.eu. Usato in produzione, open source.",
    language: "PHP",
    tags: ["Laravel", "VIES", "Compliance"],
    href: "https://github.com/Gybra/laravel-vat-eu-validator",
    org: "Gybra",
    glyph: "✕",
    hue: [148, 128],
  },
];
