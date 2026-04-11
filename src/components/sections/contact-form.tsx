"use client";

import { type FocusEvent } from "react";
import { Icon } from "@/components/icon";
import {
  TerminalField,
  TerminalTextarea,
} from "@/components/sections/contact-fields";
import { primeRecaptcha } from "@/lib/recaptcha-client";
import { SITE } from "@/lib/site";
import { useContactForm } from "@/lib/use-contact-form";

export function ContactForm() {
  const { status, errors, onSubmit } = useContactForm();

  return (
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
          label={SITE.contact.fields.name.label}
          name="name"
          type="text"
          placeholder={SITE.contact.fields.name.placeholder}
          autoComplete="name"
          required
          error={errors.name}
        />
        <TerminalField
          label={SITE.contact.fields.email.label}
          name="email"
          type="email"
          placeholder={SITE.contact.fields.email.placeholder}
          autoComplete="email"
          required
          error={errors.email}
        />
      </div>

      <TerminalField
        label={SITE.contact.fields.subject.label}
        name="subject"
        type="text"
        placeholder={SITE.contact.fields.subject.placeholder}
        required
        error={errors.subject}
      />

      <TerminalTextarea
        label={SITE.contact.fields.message.label}
        name="message"
        placeholder={SITE.contact.fields.message.placeholder}
        rows={6}
        required
        error={errors.message}
      />

      <div role="status" aria-live="polite" className="min-h-[1rem]">
        {errors.form && (
          <p className="font-mono text-xs text-red-400">{errors.form}</p>
        )}
        {status === "success" && (
          <p className="font-mono text-xs text-emerald-400">
            {SITE.contact.success}
          </p>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-opacity-90 active:scale-95 disabled:opacity-50 md:w-auto"
        >
          {status === "submitting"
            ? SITE.contact.submitting
            : SITE.contact.submit}
          <Icon
            name="send"
            size={20}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </form>
  );
}
