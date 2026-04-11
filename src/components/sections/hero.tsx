import { SITE } from "@/lib/site";

/**
 * Hero — faithful to the Stitch screen: centered headline with italic
 * secondary accent, subtitle, and a full-width terminal mockup below.
 */
export function Hero() {
  const stackJson = JSON.stringify(SITE.heroStack, null, 2);
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16 md:pt-40"
    >
      <div
        className="dot-grid pointer-events-none absolute inset-0 z-0 opacity-10"
        aria-hidden
      />

      <div className="hero-stagger z-10 w-full max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-white md:text-7xl">
            {SITE.heroHeadlineLead}{" "}
            <span className="italic text-secondary-italic-bright">
              {SITE.heroHeadlineAccent}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-400">
            {SITE.heroSubtitle}
          </p>
        </div>

        {/* Terminal mockup */}
        <div className="terminal-glow terminal-glow-pulse w-full overflow-hidden rounded-xl border border-slate-700/50 bg-primary-container/80 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-slate-700/50 bg-slate-800/50 px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-3 rounded-full bg-red-500/80" />
              <div className="size-3 rounded-full bg-amber-500/80" />
              <div className="size-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-grow text-center font-mono text-xs text-slate-500">
              bash — 80x24
            </div>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed text-slate-300 md:text-base">
            <div className="term-line term-line-1 flex flex-wrap gap-2">
              <span className="text-emerald-400">➜</span>
              <span className="text-sky-400">~/hexlab</span>
              <span className="text-slate-500">git:(main)</span>
              <span className="text-slate-100">whoami</span>
            </div>
            <div className="term-line term-line-2 mb-4 mt-1 text-slate-400">
              {SITE.legalName} — {SITE.heroWhoamiRole}.
            </div>

            <div className="term-line term-line-3 flex flex-wrap gap-2">
              <span className="text-emerald-400">➜</span>
              <span className="text-sky-400">~/hexlab</span>
              <span className="text-slate-500">git:(main)</span>
              <span className="text-slate-100">cat stack.json</span>
            </div>
            <pre className="term-line term-line-4 mb-4 mt-1 whitespace-pre-wrap text-on-primary-container">
              {stackJson}
            </pre>

            <div className="term-line term-line-5 flex flex-wrap gap-2">
              <span className="text-emerald-400">➜</span>
              <span className="text-sky-400">~/hexlab</span>
              <span className="text-slate-500">git:(main)</span>
              <span className="animate-pulse text-slate-100">█</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
