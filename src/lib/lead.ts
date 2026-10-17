/** Regras do formulário de leads, compartilhadas pelo cliente (UX) e pelo servidor (segurança). */

export type LeadField = "name" | "email" | "company";
export type LeadValues = Record<LeadField, string>;
export type LeadErrors = Partial<Record<LeadField, string>>;

export const LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  company: { min: 2, max: 160 },
} as const;

/** Provedores de e-mail pessoal: a landing só aceita e-mail corporativo. */
export const FREE_EMAIL_DOMAINS = [
  "gmail", "googlemail", "hotmail", "outlook", "live", "msn", "yahoo", "ymail", "icloud", "me", "mac",
  "aol", "bol", "uol", "terra", "ig", "proton", "protonmail", "pm", "gmx", "zoho", "yandex", "mail", "tutanota",
] as const;

/**
 * Padrão HTML (atributo `pattern`, casamento completo implícito) que recusa formato inválido
 * e domínios de e-mail pessoal: nome@gmail.com, nome@hotmail.com.br etc.
 */
export const CORPORATE_EMAIL_PATTERN = `[^@\\s]+@(?!(?:${FREE_EMAIL_DOMAINS.join("|")})\\.)[^@\\s]+\\.[^@\\s]{2,}`;

const corporateEmailRe = new RegExp(`^${CORPORATE_EMAIL_PATTERN}$`, "i");

export function validateLead(raw: Partial<Record<LeadField, unknown>>): { values: LeadValues; errors: LeadErrors } {
  const values: LeadValues = {
    name: typeof raw.name === "string" ? raw.name.trim().replace(/\s+/g, " ") : "",
    email: typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "",
    company: typeof raw.company === "string" ? raw.company.trim().replace(/\s+/g, " ") : "",
  };
  const errors: LeadErrors = {};

  if (values.name.length < LIMITS.name.min || values.name.length > LIMITS.name.max) {
    errors.name = "Informe seu nome completo.";
  }
  if (!values.email || values.email.length > LIMITS.email.max || !corporateEmailRe.test(values.email)) {
    errors.email = "Use seu e-mail corporativo (ex.: nome@empresa.com.br).";
  }
  if (values.company.length < LIMITS.company.min || values.company.length > LIMITS.company.max) {
    errors.company = "Informe o nome da empresa.";
  }
  return { values, errors };
}
