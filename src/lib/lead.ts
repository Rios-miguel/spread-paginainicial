/** Regras do formulário de leads, compartilhadas pelo cliente (UX) e pelo servidor (segurança). */

export type LeadField = "name" | "email" | "company";
export type LeadValues = Record<LeadField, string>;
export type LeadErrors = Partial<Record<LeadField, string>>;

export const LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  company: { min: 2, max: 160 },
} as const;

/**
 * Padrão HTML (atributo `pattern`) para e-mails válidos.
 * Aceita e-mails corporativos e provedores como Gmail, Outlook, etc.
 */
export const EMAIL_PATTERN = `[^@\\s]+@[^@\\s]+\\.[^@\\s]{2,}`;

const emailRe = new RegExp(`^${EMAIL_PATTERN}$`, "i");

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
  if (!values.email || values.email.length > LIMITS.email.max || !emailRe.test(values.email)) {
    errors.email = "Informe um e-mail válido (ex.: seu@gmail.com ou corporativo).";
  }
  if (values.company.length < LIMITS.company.min || values.company.length > LIMITS.company.max) {
    errors.company = "Informe o nome da empresa.";
  }
  return { values, errors };
}
