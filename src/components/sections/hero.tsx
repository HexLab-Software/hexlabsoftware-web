import { SITE } from "@/lib/site";

/**
 * Hero — faithful to the Stitch screen: centered headline with italic
 * secondary accent, subtitle, and a full-width terminal mockup below.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 z-0 opacity-10" aria-hidden />

      <div className="z-10 w-full max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-white md:text-7xl">
            Ingegneria Full Stack{" "}
            <span className="italic text-[#feb069]">ad Alta Precisione.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-400">
            Progetto sistemi scalabili, infrastrutture resilienti e interfacce
            utente intuitive per le sfide tecnologiche di domani.
          </p>
        </div>

        {/* Terminal mockup */}
        <div className="terminal-glow w-full overflow-hidden rounded-xl border border-slate-700/50 bg-[#1e2840]/80 shadow-2xl">
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
            <div className="flex flex-wrap gap-2">
              <span className="text-emerald-400">➜</span>
              <span className="text-sky-400">~/hexlab</span>
              <span className="text-slate-500">git:(main)</span>
              <span className="text-slate-100">whoami</span>
            </div>
            <div className="mb-4 mt-1 text-slate-400">
              {SITE.legalName} — Full Stack Engineer &amp; Cloud Architect.
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-emerald-400">➜</span>
              <span className="text-sky-400">~/hexlab</span>
              <span className="text-slate-500">git:(main)</span>
              <span className="text-slate-100">cat stack.json</span>
            </div>
            <div className="mb-4 mt-1 text-[#858fac]">
              {"{"}
              <br />
              &nbsp;&nbsp;&quot;backend&quot;: [&quot;Laravel&quot;, &quot;Node.js&quot;, &quot;Python&quot;, &quot;PostgreSQL&quot;],
              <br />
              &nbsp;&nbsp;&quot;frontend&quot;: [&quot;React&quot;, &quot;Next.js&quot;, &quot;TypeScript&quot;, &quot;Tailwind&quot;],
              <br />
              &nbsp;&nbsp;&quot;mobile&quot;: [&quot;iOS&quot;, &quot;Android&quot;, &quot;React Native&quot;],
              <br />
              &nbsp;&nbsp;&quot;ai&quot;: [&quot;LLM&quot;, &quot;RAG&quot;, &quot;Agents&quot;, &quot;OpenAI&quot;, &quot;Anthropic&quot;],
              <br />
              &nbsp;&nbsp;&quot;devops&quot;: [&quot;AWS&quot;, &quot;Vercel&quot;, &quot;Docker&quot;, &quot;CI/CD&quot;]
              <br />
              {"}"}
            </div>

            <div className="flex flex-wrap gap-2">
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
