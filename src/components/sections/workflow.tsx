import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export function Workflow() {
  return (
    <section id="workflow" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-24">
      <Reveal className="mb-16">
        <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-white">
          <Icon name="terminal" className="text-on-primary-container" />
          {SITE.workflow.heading}
        </h2>
        <div className="accent-bar mt-2 h-1 w-20 rounded-full bg-primary" />
      </Reveal>
      <Reveal stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SITE.workflow.steps.map((step, index) => (
          <div
            key={step.title}
            className="glass-panel rounded-2xl border border-slate-700/50 p-8"
          >
            <span className="font-mono text-sm text-on-primary-container">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-headline text-xl font-bold text-white">
              {step.title}
            </h3>
            <p className="mt-3 leading-relaxed text-slate-400">
              {step.description}
            </p>
          </div>
        ))}
      </Reveal>
      <p className="mt-10 border-l-2 border-secondary-italic-bright pl-6 text-lg text-slate-200">
        {SITE.workflow.closing}
      </p>
    </section>
  );
}
