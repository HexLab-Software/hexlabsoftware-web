"use client";

import {
  useId,
  useRef,
  useState,
  useTransition,
  type FormEvent,
  type FocusEvent,
} from "react";
import posthog from "posthog-js";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";
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

export function Contact() {
  const formId = useId();
  const renderedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "email" | "message" | "form", string>>
  >({});
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
          errors?: typeof errors;
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
    <section
      id="contatto"
      className="relative bg-[color:var(--color-surface-1)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeading
          index="04"
          eyebrow="Inizia un progetto"
          title={
            <>
              Raccontami la tua{" "}
              <span className="text-[color:var(--color-phosphor)]">idea</span>.
            </>
          }
          lede="Compila il form o scrivimi direttamente. Rispondo entro un giorno lavorativo, in italiano o in inglese."
        />

        <div className="mt-20 grid gap-16 md:grid-cols-12">
          <aside className="md:col-span-4">
            <dl className="space-y-8 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim">
              <div>
                <dt>Email</dt>
                <dd className="mt-2 font-sans text-base normal-case tracking-normal text-ink">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="underline underline-offset-4 hover:text-[color:var(--color-phosphor)]"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Telefono</dt>
                <dd className="mt-2 font-sans text-base normal-case tracking-normal text-ink">
                  <a
                    href={`tel:${SITE.phone}`}
                    className="hover:text-[color:var(--color-phosphor)]"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Sede</dt>
                <dd className="mt-2 font-sans text-base normal-case tracking-normal text-ink">
                  {SITE.address.locality}, {SITE.address.region}
                </dd>
              </div>
              <div>
                <dt>Partita IVA</dt>
                <dd className="mt-2 font-sans text-base normal-case tracking-normal text-ink">
                  {SITE.vat}
                </dd>
              </div>
            </dl>
          </aside>

          <form
            id={formId}
            onSubmit={onSubmit}
            onFocus={(event: FocusEvent<HTMLFormElement>) => {
              // Lazy-load reCAPTCHA the first time the user interacts with
              // the form, instead of on initial page load.
              if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
                primeRecaptcha();
              }
            }}
            noValidate
            className="relative md:col-span-8"
          >
            {/* honeypot — visually hidden, still in the DOM */}
            <label
              className="absolute left-[-9999px] top-[-9999px]"
              aria-hidden="true"
            >
              Company
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <div className="space-y-8 bg-[color:var(--color-surface-3)] p-8 md:p-10">
              <Field
                label="Nome"
                name="name"
                type="text"
                autoComplete="name"
                required
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
              />
              <FieldTextarea
                label="Messaggio"
                name="message"
                rows={6}
                required
                error={errors.message}
              />

              {errors.form && (
                <p className="font-mono text-xs text-[color:var(--color-error)]">
                  {errors.form}
                </p>
              )}
              {status === "success" && (
                <p className="font-mono text-xs text-[color:var(--color-phosphor)]">
                  {">"} Messaggio ricevuto. Ti scrivo a breve, grazie.
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="max-w-xs font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                  Invio gestito via Brevo · I dati non sono condivisi con terzi.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-phosphor inline-flex items-center gap-2 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] disabled:opacity-50"
                >
                  <span aria-hidden>{">"}</span>
                  {status === "submitting"
                    ? "Invio in corso…"
                    : "Esegui il deployment"}
                </button>
              </div>

              {RECAPTCHA_ENABLED && (
                <p className="pt-2 text-[10px] leading-relaxed text-ink-dim">
                  Questo sito è protetto da reCAPTCHA e si applicano la{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-ink"
                  >
                    Privacy Policy
                  </a>{" "}
                  e i{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-ink"
                  >
                    Termini di servizio
                  </a>{" "}
                  di Google.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type: "text" | "email";
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-dim"
      >
        <span className="text-[color:var(--color-phosphor)]">{">"}</span>
        {label}
        {required && <span aria-hidden>*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className="mt-2 block w-full border-b border-[color:var(--color-outline)]/40 bg-transparent py-3 font-sans text-[17px] text-ink placeholder:text-ink-dim focus:border-[color:var(--color-phosphor)] focus:outline-none"
      />
      {error && (
        <p
          id={`${id}-err`}
          className="mt-2 font-mono text-[11px] text-[color:var(--color-error)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function FieldTextarea({
  label,
  name,
  rows,
  required,
  error,
}: {
  label: string;
  name: string;
  rows: number;
  required?: boolean;
  error?: string;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-dim"
      >
        <span className="text-[color:var(--color-phosphor)]">{">"}</span>
        {label}
        {required && <span aria-hidden>*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className="mt-2 block w-full resize-none border-b border-[color:var(--color-outline)]/40 bg-transparent py-3 font-sans text-[17px] text-ink placeholder:text-ink-dim focus:border-[color:var(--color-phosphor)] focus:outline-none"
      />
      {error && (
        <p
          id={`${id}-err`}
          className="mt-2 font-mono text-[11px] text-[color:var(--color-error)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
