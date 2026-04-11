import { SectionHeading } from "@/components/section-heading";

type Skill = {
  index: string;
  title: string;
  description: string;
  stack: readonly string[];
};

const SKILLS: readonly Skill[] = [
  {
    index: "01",
    title: "Full Stack Engineering",
    description:
      "Progetto e implemento l'intero ciclo di vita di un prodotto: API type-safe, database modellati per scalare, frontend SSR pronti per la ricerca.",
    stack: ["Next.js", "React", "TypeScript", "Node", "Laravel", "Spring Boot"],
  },
  {
    index: "02",
    title: "Mobile & Multi-Platform",
    description:
      "App native iOS/Android e cross-platform, con CI/CD automatizzato su store e pipeline di qualità che intercettano i bug prima dei review.",
    stack: ["iOS", "Android", "React Native", "Firebase", "Fastlane"],
  },
  {
    index: "03",
    title: "AI & LLM Systems",
    description:
      "Integro modelli linguistici in prodotti reali: RAG, agenti autonomi, pipeline di ingestion e valutazione. Dal POC al deploy in produzione.",
    stack: ["OpenAI", "Anthropic", "LangGraph", "Embeddings", "Vector DB"],
  },
  {
    index: "04",
    title: "E-commerce & Headless",
    description:
      "Negozi ad alte conversioni su WooCommerce, PrestaShop, Shopify — con personalizzazioni al core, integrazioni logistiche ed ERP.",
    stack: ["WooCommerce", "PrestaShop", "Shopify", "Stripe", "Adyen"],
  },
  {
    index: "05",
    title: "Cloud & DevOps",
    description:
      "Infrastruttura dichiarativa, osservabilità end-to-end e cost-control. Deploy immutabili su Vercel, AWS e container orchestrati.",
    stack: ["Vercel", "AWS", "Docker", "Terraform", "GitHub Actions"],
  },
  {
    index: "06",
    title: "Performance & SEO",
    description:
      "Core Web Vitals verde-scuro, schema.org curato, asset budget disciplinato: siti che i motori amano e gli utenti non abbandonano.",
    stack: ["Lighthouse", "Web Vitals", "JSON-LD", "ISR", "Edge Cache"],
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article className="group relative flex h-full flex-col justify-between bg-[color:var(--color-surface-3)] p-8 transition-colors duration-300 hover:bg-[color:var(--color-surface-4)]">
      <div>
        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-phosphor)]/80">
            {skill.index}
          </span>
          <span
            className="size-2.5 bg-[color:var(--color-phosphor)]/40 transition-colors group-hover:bg-[color:var(--color-phosphor)]"
            aria-hidden
          />
        </div>
        <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-ink">
          {skill.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
          {skill.description}
        </p>
      </div>
      <ul className="mt-10 flex flex-wrap gap-2">
        {skill.stack.map((tech) => (
          <li
            key={tech}
            className="chip-snip bg-[color:var(--color-surface-5)] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Skills() {
  return (
    <section
      id="competenze"
      className="relative bg-[color:var(--color-surface-2)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeading
          index="01"
          eyebrow="Competenze"
          title={
            <>
              Sei discipline,
              <br />
              <span className="text-[color:var(--color-phosphor)]">un solo</span> interlocutore.
            </>
          }
          lede="Lavoro come single point of contact: dall'architettura iniziale alla manutenzione evolutiva. Niente catene di subfornitori, niente handoff persi."
        />
        <div className="mt-20 grid gap-[1px] bg-[color:var(--color-surface-1)] md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill) => (
            <SkillCard key={skill.index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
