"use client";

import { useId } from "react";

type BaseProps = {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
};

export function TerminalField({
  label,
  name,
  type,
  placeholder,
  required,
  autoComplete,
  error,
}: BaseProps & {
  type: "text" | "email";
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-mono text-sm text-on-primary-container"
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
        className="w-full rounded border border-slate-700 bg-slate-800/50 p-3 font-mono text-sm text-slate-100 outline-none transition-all focus:border-on-primary-container focus:ring-1 focus:ring-on-primary-container"
      />
      {error && (
        <p id={`${id}-err`} className="font-mono text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function TerminalTextarea({
  label,
  name,
  placeholder,
  rows,
  required,
  error,
}: BaseProps & { rows: number }) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-mono text-sm text-on-primary-container"
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
        className="min-h-[150px] w-full rounded border border-slate-700 bg-slate-800/50 p-3 font-mono text-sm text-slate-100 outline-none transition-all focus:border-on-primary-container focus:ring-1 focus:ring-on-primary-container"
      />
      {error && (
        <p id={`${id}-err`} className="font-mono text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
