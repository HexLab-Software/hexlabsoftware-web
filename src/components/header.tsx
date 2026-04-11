"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

const NAV_ITEMS = [
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
  { href: "#message-form", label: "Preventivo" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-700/50 bg-[#1E2840] shadow-lg shadow-black/20">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 font-['Inter'] tracking-tight antialiased">
        <a
          href="#top"
          className="flex items-center gap-2 text-xl font-mono font-bold text-slate-100"
          aria-label="HexLab Software — home"
        >
          <Logo size={36} />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="cursor-pointer font-medium text-slate-400 transition-colors duration-200 hover:text-slate-100 active:scale-95"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded bg-[#6d7793] px-5 py-2 font-medium text-white transition-all hover:bg-opacity-90 active:scale-95 md:inline-flex"
        >
          Prenota call
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Apri navigazione"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center text-slate-100 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <path
              d={open ? "M4 4 L18 18 M18 4 L4 18" : "M2 6h18M2 11h18M2 16h18"}
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-slate-700/50 bg-[#1E2840]/98 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-medium text-slate-400 hover:text-slate-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded bg-[#6d7793] px-5 py-3 text-center font-medium text-white"
              >
                Prenota call
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
