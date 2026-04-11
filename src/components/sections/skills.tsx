import { Icon } from "@/components/icon";

type Skill = {
  icon: string;
  title: string;
  description: string;
  stack: readonly string[];
  tone: "sky" | "emerald" | "amber" | "purple";
  span: string;
  size?: "lg" | "md" | "sm";
  /** layout mode — "horizontal" is the wide bottom card with icon left */
  orientation?: "vertical" | "horizontal";
};

const TONE_CLASSES: Record<
  Skill["tone"],
  { iconBg: string; iconText: string; chip: string }
> = {
  sky: {
    iconBg: "bg-sky-500/20",
    iconText: "text-sky-400",
    chip: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  emerald: {
    iconBg: "bg-emerald-500/20",
    iconText: "text-emerald-400",
    chip: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  amber: {
    iconBg: "bg-amber-500/20",
    iconText: "text-amber-400",
    chip: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  purple: {
    iconBg: "bg-purple-500/20",
    iconText: "text-purple-400",
    chip: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
};

const SKILLS: readonly Skill[] = [
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

function SkillCard({ skill }: { skill: Skill }) {
  const tone = TONE_CLASSES[skill.tone];
  const titleClass =
    skill.size === "md"
      ? "text-xl font-headline font-bold text-white mb-3"
      : "text-2xl font-headline font-bold text-white mb-3";
  const descClass =
    skill.size === "md"
      ? "text-slate-400 mb-6 text-sm leading-relaxed"
      : "text-slate-400 mb-6 leading-relaxed";

  const iconBlock = (
    <div
      className={`mb-6 flex size-12 items-center justify-center rounded-lg ${tone.iconBg}`}
    >
      <Icon name={skill.icon} className={tone.iconText} size={24} />
    </div>
  );

  const body = (
    <>
      <h3 className={titleClass}>{skill.title}</h3>
      <p className={descClass}>{skill.description}</p>
      <div className="flex flex-wrap gap-2">
        {skill.stack.map((tech) => (
          <span
            key={tech}
            className={`rounded border px-3 py-1 font-mono text-xs ${tone.chip}`}
          >
            {tech}
          </span>
        ))}
      </div>
    </>
  );

  if (skill.orientation === "horizontal") {
    return (
      <div
        className={`glass-panel flex flex-col items-start gap-8 rounded-2xl border border-slate-700/50 bg-surface-container-lowest/5 p-8 transition-all hover:border-[#858fac] md:flex-row ${skill.span}`}
      >
        <div className="flex-shrink-0">{iconBlock}</div>
        <div>{body}</div>
      </div>
    );
  }

  return (
    <div
      className={`glass-panel rounded-2xl border border-slate-700/50 bg-surface-container-lowest/5 p-8 transition-all hover:border-[#858fac] ${skill.span}`}
    >
      {iconBlock}
      {body}
    </div>
  );
}

export function Skills() {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16">
        <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-white">
          <Icon name="terminal" className="text-[#858fac]" />
          Competenze Verticali
        </h2>
        <div className="mt-2 h-1 w-20 rounded-full bg-[#6d7793]" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.title} skill={skill} />
        ))}
      </div>
    </section>
  );
}
