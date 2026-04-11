import { Icon } from "@/components/icon";
import { PROJECTS, type Project } from "@/lib/projects";
import { SITE } from "@/lib/site";

const LANGUAGE_DOT: Record<string, string> = {
  Python: "bg-sky-400",
  PHP: "bg-indigo-400",
  TypeScript: "bg-sky-400",
  JavaScript: "bg-amber-400",
  Go: "bg-emerald-400",
  Rust: "bg-amber-400",
};

/**
 * Deterministic gradient tile that replaces stock imagery.
 * The Stitch mockup used placeholder Google images, we don't ship those
 * in prod — instead each project gets a reproducible gradient keyed on
 * `project.hue` plus its mono glyph floating at the centre.
 */
function ProjectVisual({ project }: { project: Project }) {
  const [h1, h2] = project.hue;
  return (
    <div
      className="relative h-48 overflow-hidden bg-slate-800"
      style={{
        background: `
          radial-gradient(ellipse at 20% 10%, hsl(${h1} 65% 35% / 0.55), transparent 55%),
          radial-gradient(ellipse at 85% 85%, hsl(${h2} 60% 30% / 0.45), transparent 60%),
          linear-gradient(135deg, #1e2840 0%, #0f172a 100%)
        `,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#858fac 1px, transparent 1px), linear-gradient(90deg, #858fac 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <span
        className="absolute inset-0 flex items-center justify-center font-mono text-8xl leading-none text-[#858fac]/60 transition-transform duration-500 group-hover:scale-105"
        style={{ textShadow: `0 0 48px hsl(${h1} 80% 55% / 0.35)` }}
      >
        {project.glyph}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const dotClass = LANGUAGE_DOT[project.language] ?? "bg-slate-400";
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-700/50 bg-[#1e2840] transition-all hover:border-[#6d7793]"
    >
      <ProjectVisual project={project} />
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="font-mono font-bold text-white">{project.name}</h3>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <Icon name="open_in_new" size={16} />
            </span>
          </div>
        </div>
        <p className="mb-6 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>
        <div className="flex items-center gap-2">
          <span className={`size-3 rounded-full ${dotClass}`} aria-hidden />
          <span className="font-mono text-xs text-slate-500">
            {project.language}
          </span>
        </div>
      </div>
    </a>
  );
}

export function Projects() {
  // Stitch mockup shows 3 cards — keep the top three pinned repos.
  const top = PROJECTS.slice(0, 3);
  return (
    <section
      id="projects"
      className="border-y border-slate-700/50 bg-[#1e2840]/30 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-white">
              <Icon name="code" className="text-[#858fac]" />
              Open Source Projects
            </h2>
            <div className="mt-2 h-1 w-20 rounded-full bg-[#6d7793]" />
          </div>
          <a
            href={SITE.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium text-[#858fac] hover:underline"
          >
            Vedi tutti su GitHub <Icon name="open_in_new" size={16} />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {top.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
