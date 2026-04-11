"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

const NAV_ITEMS = [
  { href: "#competenze", label: "Competenze" },
  { href: "#progetti", label: "Progetti" },
  { href: "#prenota", label: "Prenota" },
  { href: "#contatto", label: "Contatto" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300 data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:bg-[color:var(--color-surface-1)]/70"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="group relative z-10 text-ink transition-colors hover:text-[color:var(--color-phosphor)]"
          aria-label={`${SITE.name} — home`}
        >
          <Logo />
        </a>

        <nav aria-label="Primario" className="hidden md:block">
          <ul className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.22em]">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 text-ink-dim transition-colors hover:text-ink"
                >
                  <span className="text-[color:var(--color-phosphor)]/60 group-hover:text-[color:var(--color-phosphor)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#prenota"
            className="btn-phosphor inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em]"
          >
            <span aria-hidden>{">"}</span>
            <span>Prenota call</span>
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Apri navigazione"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex size-10 items-center justify-center text-ink md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <path
              d="M2 6h18M2 11h18M2 16h18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-[color:var(--color-outline-ghost)]/30 bg-[color:var(--color-surface-1)]/95 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col px-6 py-4 font-mono text-sm uppercase tracking-[0.18em]">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3 text-ink-dim hover:text-[color:var(--color-phosphor)]"
                >
                  <span className="text-[color:var(--color-phosphor)]/60">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#prenota"
                onClick={() => setOpen(false)}
                className="btn-phosphor inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-[11px]"
              >
                <span aria-hidden>{">"}</span>
                Prenota call
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
