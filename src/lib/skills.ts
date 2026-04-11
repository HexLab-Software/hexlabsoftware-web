/**
 * Skills section content. Mirrors `projects.ts`: the section component stays
 * purely presentational and rebrands are a single-file edit per CLAUDE.md.
 */

export type SkillTone = "sky" | "emerald" | "amber" | "purple";

export type Skill = {
  icon: string;
  title: string;
  description: string;
  stack: readonly string[];
  tone: SkillTone;
  span: string;
  size?: "lg" | "md" | "sm";
  /** layout mode — "horizontal" is the wide bottom card with icon left */
  orientation?: "vertical" | "horizontal";
};

export const SKILLS_HEADING = "Competenze Verticali";

export const SKILLS: readonly Skill[] = [
  {
    icon: "web",
    title: "Frontend Engineering",
    description:
      "Sviluppo interfacce reattive e performanti con un focus ossessivo sull'esperienza utente e l'accessibilità.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind"],
    tone: "sky",
    span: "md:col-span-2",
    size: "lg",
  },
  {
    icon: "database",
    title: "Backend & Distributed Systems",
    description:
      "Architetture a microservizi scalabili, ottimizzazione di database e gestione di flussi dati ad alto volume.",
    stack: ["Laravel", "Node.js", "PostgreSQL", "Redis"],
    tone: "emerald",
    span: "md:col-span-2",
    size: "lg",
  },
  {
    icon: "cloud",
    title: "DevOps & Infrastructure",
    description:
      "Automazione dei deployment e gestione cloud-native attraverso IaC.",
    stack: ["AWS", "Docker"],
    tone: "amber",
    span: "md:col-span-2 lg:col-span-1",
    size: "md",
  },
  {
    icon: "strategy",
    title: "Mobile, AI & Tech Strategy",
    description:
      "App native iOS/Android, integrazione di modelli linguistici in prodotti reali, mentoring tecnico e traduzione di obiettivi di business in soluzioni robuste.",
    stack: ["iOS", "Android", "LLM", "System Design", "Mentorship"],
    tone: "purple",
    span: "md:col-span-2 lg:col-span-3",
    size: "lg",
    orientation: "horizontal",
  },
];
