import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[color:var(--color-outline-ghost)]/20 bg-[color:var(--color-surface-0)] pb-10 pt-24">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Logo size={44} />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-muted">
            {SITE.name} è lo studio freelance di {SITE.legalName}. Ingegneria
            software su misura, senza intermediari.
          </p>
          <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-dim">
            P. IVA {SITE.vat}
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-phosphor)]">
            Navigazione
          </h3>
          <ul className="mt-5 space-y-3 text-[15px] text-ink-muted">
            <li><a href="#competenze" className="hover:text-ink">Competenze</a></li>
            <li><a href="#progetti" className="hover:text-ink">Progetti</a></li>
            <li><a href="#prenota" className="hover:text-ink">Prenota call</a></li>
            <li><a href="#contatto" className="hover:text-ink">Contatto</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-phosphor)]">
            Contatti
          </h3>
          <ul className="mt-5 space-y-3 text-[15px] text-ink-muted">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-ink"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phone}`} className="hover:text-ink">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>{SITE.address.locality}, {SITE.address.region}, Italia</li>
          </ul>

          <ul className="mt-8 flex items-center gap-4 font-mono text-[10.5px] uppercase tracking-[0.22em]">
            <li>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-dim hover:text-[color:var(--color-phosphor)]"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </li>
            <li className="text-ink-dim">·</li>
            <li>
              <a
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-dim hover:text-[color:var(--color-phosphor)]"
                aria-label="GitHub"
              >
                GitHub
              </a>
            </li>
            <li className="text-ink-dim">·</li>
            <li>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-dim hover:text-[color:var(--color-phosphor)]"
                aria-label="Facebook"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim md:px-10">
        <p>
          © {year} {SITE.legalName} · All rights reserved
        </p>
        <p className="flex items-center gap-2">
          <span className="size-2 bg-[color:var(--color-phosphor)]" aria-hidden />
          Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
