/**
 * Contact form schema — zero-dep handwritten validator.
 *
 * We deliberately avoid pulling zod for ~60kb just to validate four fields.
 * The same rules run on client (progressive enhancement) and server (source
 * of truth), so a single shared module guarantees drift-free validation.
 */

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** honeypot — must be empty */
  company?: string;
  /** time the form was rendered, used for minimum-fill heuristic */
  renderedAt?: number;
};

type ValidatedFields = Required<Pick<ContactPayload, "name" | "email" | "subject" | "message">>;
type FieldKey = keyof ValidatedFields | "form";

export type ValidationResult =
  | { ok: true; data: ValidatedFields }
  | { ok: false; errors: Partial<Record<FieldKey, string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MIN_FILL_MS = 1500;

export function validateContact(input: Partial<ContactPayload>): ValidationResult {
  const errors: Partial<Record<FieldKey, string>> = {};

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const subject = (input.subject ?? "").trim();
  const message = (input.message ?? "").trim();

  if (name.length < 2) errors.name = "Il nome deve avere almeno 2 caratteri.";
  if (name.length > 120) errors.name = "Il nome è troppo lungo.";

  if (!EMAIL_RE.test(email)) errors.email = "Inserisci un'email valida.";
  if (email.length > 200) errors.email = "L'email è troppo lunga.";

  if (subject.length < 3) errors.subject = "L'oggetto deve avere almeno 3 caratteri.";
  if (subject.length > 200) errors.subject = "L'oggetto è troppo lungo.";

  if (message.length < 20)
    errors.message = "Scrivi almeno 20 caratteri per descrivere il progetto.";
  if (message.length > 4000) errors.message = "Il messaggio supera i 4000 caratteri.";

  // Spam heuristics
  if (input.company && input.company.length > 0) {
    errors.form = "Rilevato spam.";
  }
  if (
    typeof input.renderedAt === "number" &&
    Date.now() - input.renderedAt < MIN_FILL_MS
  ) {
    errors.form = "Form inviato troppo velocemente.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, subject, message } };
}
