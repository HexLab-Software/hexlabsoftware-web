import { SectionHeading } from "@/components/section-heading";
import { PROJECTS, type Project } from "@/lib/projects";
import { SITE } from "@/lib/site";

/**
 * Deterministic "generated" project visual — a CSS gradient + ASCII glyph.
 * Zero external asset requests, SSG-friendly, and it matches the
 * terminal aesthetic better than screenshot thumbnails would.
 */
function ProjectVisual({ project }: { project: Project }) {
  const [h1, h2] = project.hue;
  return (
    <div
      className="relative flex h-40 items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 10%, hsl(${h1} 80% 55% / 0.22), transparent 55%),
          radial-gradient(ellipse at 85% 90%, hsl(${h2} 70% 45% / 0.18), transparent 60%),
          linear-gradient(135deg, var(--color-surface-4) 0%, var(--color-surface-2) 100%)
        `,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-phosphor) 1px, transparent 1px), linear-gradient(90deg, var(--color-phosphor) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <span
        className="relative font-display text-8xl leading-none text-[color:var(--color-phosphor)]/70"
        style={{ textShadow: `0 0 40px hsl(${h1} 90% 55% / 0.5)` }}
      >
        {project.glyph}
      </span>
      <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
        {project.language}
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col bg-[color:var(--color-surface-3)] transition-colors duration-300 hover:bg-[color:var(--color-surface-4)]"
    >
      <ProjectVisual project={project} />
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[color:var(--color-phosphor)]/80">
              {String(index + 1).padStart(2, "0")} / {project.org}
            </p>
            <h3 className="mt-2 font-display text-xl font-medium leading-tight tracking-tight text-ink">
              {project.name}
            </h3>
            <p className="mt-1 font-mono text-[11px] text-ink-dim">
              {project.tagline}
            </p>
          </div>
          <svg
            className="mt-1 size-5 shrink-0 text-ink-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-phosphor)]"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 15 L15 5 M8 5 H15 V12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </div>
        <p className="flex-1 text-[14.5px] leading-relaxed text-ink-muted">
          {project.description}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="chip-snip bg-[color:var(--color-surface-5)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}

export function Projects() {
  return (
    <section
      id="progetti"
      className="relative bg-[color:var(--color-surface-1)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeading
          index="02"
          eyebrow="Open Source · Progetti"
          title={
            <>
              Codice che spedisco,
              <br />
              <span className="text-[color:var(--color-phosphor)]">pubblicamente</span>.
            </>
          }
          lede="Una selezione dei miei progetti open source, ordinati per importanza. Ogni repo è in produzione o ha servito un cliente reale."
        />

        <div className="mt-20 grid gap-[1px] bg-[color:var(--color-surface-2)] md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim">
          <p>
            <span className="text-[color:var(--color-phosphor)]">{">"}</span>{" "}
            Tutti i repo su{" "}
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-4 hover:text-[color:var(--color-phosphor)]"
            >
              github.com/Gybra
            </a>{" "}
            ·{" "}
            <a
              href={SITE.social.githubOrg}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-4 hover:text-[color:var(--color-phosphor)]"
            >
              /HexLab-Software
            </a>
          </p>
          <p className="text-ink-dim">
            MIT · Apache-2.0 · GPL
          </p>
        </div>
      </div>
    </section>
  );
}
