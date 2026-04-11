import { SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-slate-800 bg-primary-container">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-12 py-8 text-sm tracking-wide text-slate-400 md:flex-row">
        <div>
          © {year} {SITE.legalName} — {SITE.name}. P.IVA {SITE.vat}.
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a
            href={SITE.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 underline decoration-2 underline-offset-4 transition-all duration-300 hover:text-on-primary-container"
          >
            GitHub
          </a>
          <a
            href={SITE.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 underline decoration-2 underline-offset-4 transition-all duration-300 hover:text-on-primary-container"
          >
            LinkedIn
          </a>
          <a
            href={SITE.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 underline decoration-2 underline-offset-4 transition-all duration-300 hover:text-on-primary-container"
          >
            Facebook
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-slate-500 underline decoration-2 underline-offset-4 transition-all duration-300 hover:text-on-primary-container"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
