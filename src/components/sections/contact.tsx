import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { RECAPTCHA_ENABLED } from "@/lib/recaptcha-client";
import { SITE } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
      <Reveal className="mb-12 text-center">
        <h2 className="flex items-center justify-center gap-3 font-headline text-3xl font-bold text-white">
          <Icon name="mail" className="text-on-primary-container" />
          {SITE.contact.heading}
        </h2>
        <div className="accent-bar mx-auto mt-2 h-1 w-20 rounded-full bg-primary" />
        <p className="mt-4 text-slate-400">{SITE.contact.subtitle}</p>
      </Reveal>

      <Reveal className="terminal-glow glass-panel w-full overflow-hidden rounded-xl border border-slate-700/50 bg-primary-container/60 p-8 shadow-2xl">
        <ContactForm />

        <div className="mt-8 flex items-center gap-2 font-mono text-xs text-slate-500">
          <span className="text-emerald-400">➜</span>
          <span className="text-sky-400">~/contact</span>
          <span className="animate-pulse">█</span>
        </div>

        {RECAPTCHA_ENABLED && (
          <p className="mt-4 text-[10px] leading-relaxed text-slate-600">
            Questo sito è protetto da reCAPTCHA e si applicano la{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-slate-400"
            >
              Privacy Policy
            </a>{" "}
            e i{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-slate-400"
            >
              Termini di servizio
            </a>{" "}
            di Google.
          </p>
        )}
      </Reveal>
    </section>
  );
}
