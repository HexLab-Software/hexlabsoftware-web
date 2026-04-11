"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import posthog from "posthog-js";
import { validateContact, type ContactPayload } from "@/lib/contact-schema";
import { executeRecaptcha, RECAPTCHA_ENABLED } from "@/lib/recaptcha-client";

export type ContactStatus = "idle" | "submitting" | "success" | "error";

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "subject" | "message" | "form", string>
>;

export function useContactForm() {
  const renderedAt = useRef(Date.now());
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
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
          errors?: ContactFieldErrors;
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

  return { status, errors, onSubmit };
}
