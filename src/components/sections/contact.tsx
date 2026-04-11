"use client";

import {
  useId,
  useRef,
  useState,
  useTransition,
  type FocusEvent,
  type FormEvent,
} from "react";
import posthog from "posthog-js";
import { Icon } from "@/components/icon";
import {
  validateContact,
  type ContactPayload,
} from "@/lib/contact-schema";
import {
  executeRecaptcha,
  primeRecaptcha,
  RECAPTCHA_ENABLED,
} from "@/lib/recaptcha-client";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<
  Record<"name" | "email" | "subject" | "message" | "form", string>
>;

export function Contact() {
  const renderedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [, startTransition] = useTransition();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ContactPayload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
      renderedAt: renderedAt.current,
    };

    const local = validateContact(payload);
    if (!local.ok) {
      setErrors(local.errors);
      setStatus("error");
      return;
    }

    const recaptchaToken = RECAPTCHA_ENABLED
      ? await executeRecaptcha("contact")
      : null;
    if (RECAPTCHA_ENABLED && !recaptchaToken) {
      setErrors({
        form: "Impossibile caricare la verifica anti-bot. Disabilita i blocchi script e riprova.",
      });
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, recaptchaToken }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          errors?: FieldErrors;
        };
        setErrors(data.errors ?? { form: "Invio non riuscito, riprova." });
        setStatus("error");
        return;
      }

      startTransition(() => {
        posthog.capture?.("contact_form_submitted");
      });
      form.reset();
      setStatus("success");
    } catch {
      setErrors({ form: "Problema di rete, riprova tra poco." });
      setStatus("error");
    }
  }

  return (
    <section id="message-form" className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="flex items-center justify-center gap-3 font-headline text-3xl font-bold text-white">
          <Icon name="mail" className="text-[#858fac]" />
          Iniziamo un Progetto
        </h2>
        <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-[#6d7793]" />
        <p className="mt-4 text-slate-400">
          Invia un messaggio diretto per approfondire collaborazioni tecniche o
          consulenze.
        </p>
      </div>

      <div className="terminal-glow glass-panel w-full overflow-hidden rounded-xl border border-slate-700/50 bg-[#1e2840]/60 p-8 shadow-2xl">
        <form
          className="space-y-6"
          onSubmit={onSubmit}
          onFocus={(event: FocusEvent<HTMLFormElement>) => {
            if (
              event.target.tagName === "INPUT" ||
              event.target.tagName === "TEXTAREA"
            ) {
              primeRecaptcha();
            }
          }}
          noValidate
        >
          {/* honeypot */}
          <label
            className="absolute left-[-9999px] top-[-9999px]"
            aria-hidden="true"
          >
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TerminalField
              label="Nome"
              name="name"
              type="text"
              placeholder="Inserisci il tuo nome"
              autoComplete="name"
              required
              error={errors.name}
            />
            <TerminalField
              label="Email"
              name="email"
              type="email"
              placeholder="latua@email.com"
              autoComplete="email"
              required
              error={errors.email}
            />
          </div>

          <TerminalField
            label="Oggetto"
            name="subject"
            type="text"
            placeholder="Di cosa vogliamo parlare?"
            required
            error={errors.subject}
          />

          <TerminalTextarea
            label="Messaggio"
            name="message"
            placeholder="Descrivi brevemente il tuo progetto o la tua richiesta..."
            rows={6}
            required
            error={errors.message}
          />

          {errors.form && (
            <p className="font-mono text-xs text-red-400">{errors.form}</p>
          )}
          {status === "success" && (
            <p className="font-mono text-xs text-emerald-400">
              ➜ Messaggio ricevuto. Ti scrivo a breve, grazie.
            </p>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded bg-[#6d7793] px-8 py-4 font-bold text-white transition-all hover:bg-opacity-90 active:scale-95 disabled:opacity-50 md:w-auto"
            >
              {status === "submitting" ? "Invio in corso…" : "Invia Messaggio"}
              <Icon
                name="send"
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </form>

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
      </div>
    </section>
  );
}

function TerminalField({
  label,
  name,
  type,
  placeholder,
  required,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type: "text" | "email";
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-mono text-sm text-[#858fac]"
      >
        # {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className="w-full rounded border border-slate-700 bg-slate-800/50 p-3 font-mono text-sm text-slate-100 outline-none transition-all focus:border-[#858fac] focus:ring-1 focus:ring-[#858fac]"
      />
      {error && (
        <p id={`${id}-err`} className="font-mono text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function TerminalTextarea({
  label,
  name,
  placeholder,
  rows,
  required,
  error,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows: number;
  required?: boolean;
  error?: string;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-mono text-sm text-[#858fac]"
      >
        # {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className="min-h-[150px] w-full rounded border border-slate-700 bg-slate-800/50 p-3 font-mono text-sm text-slate-100 outline-none transition-all focus:border-[#858fac] focus:ring-1 focus:ring-[#858fac]"
      />
      {error && (
        <p id={`${id}-err`} className="font-mono text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
