import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SKILLS, SKILLS_HEADING, type Skill, type SkillTone } from "@/lib/skills";

const TONE_CLASSES: Record<
  SkillTone,
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
        className={`glass-panel flex flex-col items-start gap-8 rounded-2xl border border-slate-700/50 p-8 transition-all hover:border-on-primary-container md:flex-row ${skill.span}`}
      >
        <div className="flex-shrink-0">{iconBlock}</div>
        <div>{body}</div>
      </div>
    );
  }

  return (
    <div
      className={`glass-panel rounded-2xl border border-slate-700/50 p-8 transition-all hover:border-on-primary-container ${skill.span}`}
    >
      {iconBlock}
      {body}
    </div>
  );
}

export function Skills() {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal className="mb-16">
        <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-white">
          <Icon name="terminal" className="text-on-primary-container" />
          {SKILLS_HEADING}
        </h2>
        <div className="accent-bar mt-2 h-1 w-20 rounded-full bg-primary" />
      </Reveal>
      <Reveal stagger className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.title} skill={skill} />
        ))}
      </Reveal>
    </section>
  );
}
