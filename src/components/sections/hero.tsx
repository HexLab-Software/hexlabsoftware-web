import { TerminalWindow } from "@/components/terminal-window";
import { SITE } from "@/lib/site";

/**
 * Hero — "Ingegneria Full Stack ad Alta Precisione".
 * Asymmetric 6/6 grid: editorial headline left, terminal code window right,
 * vertically offset by 40px per design md.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="crt-bloom relative overflow-hidden pt-32 md:pt-40"
    >
      <div className="grid-overlay absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-6 pb-28 md:grid-cols-12 md:px-10 md:pb-40">
        {/* Left column — editorial headline */}
        <div className="md:col-span-7 md:pt-6">
          <p className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-phosphor)]">
            <span className="block h-px w-10 bg-[color:var(--color-phosphor)]" />
            {SITE.legalName} · {SITE.address.locality}
          </p>

          <h1 className="font-display text-[clamp(2.75rem,7vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.035em] text-ink">
            Ingegneria
            <br />
            <span className="text-[color:var(--color-phosphor)]">Full&nbsp;Stack</span>
            <br />
            ad Alta Precisione<span className="cursor" aria-hidden />
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-muted">
            Disegno, costruisco e manutengo sistemi scalabili per brand,
            startup e PMI. Dal codice alla consegna, senza intermediari — con
            uno standard <span className="text-ink">senior</span> dal 2011.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#prenota"
              className="btn-phosphor inline-flex items-center gap-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em]"
            >
              <span aria-hidden>{">"}</span>
              Prenota una call
            </a>
            <a
              href="#contatto"
              className="group inline-flex items-center gap-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ink hover:text-[color:var(--color-phosphor)]"
            >
              <span className="size-2 bg-[color:var(--color-phosphor)]" aria-hidden />
              Chiedi un preventivo
            </a>
          </div>

          <dl className="mt-16 grid max-w-xl grid-cols-3 gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
            <div>
              <dt>Anni attivi</dt>
              <dd className="mt-2 font-display text-3xl font-medium normal-case tracking-tight text-ink">
                14+
              </dd>
            </div>
            <div>
              <dt>Stack padroneggiati</dt>
              <dd className="mt-2 font-display text-3xl font-medium normal-case tracking-tight text-ink">
                9
              </dd>
            </div>
            <div>
              <dt>Uptime medio</dt>
              <dd className="mt-2 font-display text-3xl font-medium normal-case tracking-tight text-ink">
                99.9%
              </dd>
            </div>
          </dl>
        </div>

        {/* Right column — terminal code window, offset down by 40px */}
        <div className="md:col-span-5 md:pt-16">
          <TerminalWindow path="~/hexlab/stack.ts">
            <pre className="overflow-x-auto px-5 py-6 font-mono text-[12.5px] leading-relaxed text-ink-muted">
              <code>
                <span className="text-[color:var(--color-phosphor)]/80">
                  export const
                </span>{" "}
                <span className="text-ink">stack</span>{" "}
                <span className="text-[color:var(--color-phosphor)]/80">=</span>{" "}
                {"{"}
                {"\n"}
                {"  "}mobile:{" "}
                <span className="text-[color:var(--color-phosphor)]">
                  [&apos;iOS&apos;, &apos;Android&apos;]
                </span>
                ,{"\n"}
                {"  "}web:{"    "}
                <span className="text-[color:var(--color-phosphor)]">
                  [&apos;Next.js&apos;, &apos;React&apos;]
                </span>
                ,{"\n"}
                {"  "}backend:{" "}
                <span className="text-[color:var(--color-phosphor)]">
                  [&apos;Node&apos;, &apos;Laravel&apos;, &apos;Spring&apos;]
                </span>
                ,{"\n"}
                {"  "}ai:{"     "}
                <span className="text-[color:var(--color-phosphor)]">
                  [&apos;LLM&apos;, &apos;RAG&apos;, &apos;Agents&apos;]
                </span>
                ,{"\n"}
                {"  "}commerce:{" "}
                <span className="text-[color:var(--color-phosphor)]">
                  [&apos;Woo&apos;, &apos;Shopify&apos;, &apos;PS&apos;]
                </span>
                ,{"\n"}
                {"  "}cloud:{"  "}
                <span className="text-[color:var(--color-phosphor)]">
                  [&apos;Vercel&apos;, &apos;AWS&apos;, &apos;Fly.io&apos;]
                </span>
                ,{"\n"}
                {"}"} <span className="text-ink-dim">as const;</span>
                {"\n\n"}
                <span className="text-ink-dim">// v{new Date().getFullYear()} — {SITE.vat}</span>
              </code>
            </pre>
          </TerminalWindow>

          <div className="mt-6 ml-auto flex max-w-[340px] items-center gap-4 bg-[color:var(--color-surface-3)] p-5">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping bg-[color:var(--color-phosphor)] opacity-60" />
              <span className="relative size-2.5 bg-[color:var(--color-phosphor)]" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              Disponibile per nuovi progetti
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
