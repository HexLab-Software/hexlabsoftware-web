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

export const SKILLS_HEADING = "Cosa porto nel team";

export const SKILLS: readonly Skill[] = [
  {
    icon: "database",
    title: "Backend e system design",
    description:
      "Progetto API, modelli dati e sistemi manutenibili. Laravel/PHP è il mio stack principale.",
    stack: ["Laravel", "PHP", "Python", "Database", "System design"],
    tone: "emerald",
    span: "md:col-span-2",
    size: "lg",
  },
  {
    icon: "web",
    title: "Web e mobile",
    description:
      "Sviluppo interfacce e applicazioni con attenzione a comportamento, accessibilità e manutenzione.",
    stack: ["React", "Next.js", "TypeScript", "React Native"],
    tone: "sky",
    span: "md:col-span-2",
    size: "lg",
  },
  {
    icon: "strategy",
    title: "Qualità del software",
    description:
      "Definisco verifiche automatiche e controllo i flussi critici con test di integrazione ed E2E.",
    stack: ["Testing", "Playwright", "Review"],
    tone: "amber",
    span: "md:col-span-2 lg:col-span-1",
    size: "md",
  },
  {
    icon: "terminal",
    title: "Workflow per coding agent",
    description:
      "Progetto harness, skills e guardrail per integrare gli agenti nel processo del team, con responsabilità e verifiche esplicite.",
    stack: ["Requisiti", "Multi-model", "Validazione"],
    tone: "purple",
    span: "md:col-span-2 lg:col-span-3",
    size: "lg",
    orientation: "horizontal",
  },
];
