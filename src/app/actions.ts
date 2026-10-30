"use server";

import { validateLead, type LeadErrors, type LeadValues } from "@/lib/lead";
import { getDb } from "@/lib/db";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: LeadErrors;
  values?: LeadValues;
};

/** Recebe o formulário de contato e grava o lead no PostgreSQL da Spread (insert-only). */
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // honeypot: campo invisível que só robô preenche; finge sucesso para não dar pista
  const trap = formData.get("website");
  if (typeof trap === "string" && trap.trim() !== "") {
    return { status: "success" };
  }

  const { values, errors } = validateLead({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
  });

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Revise os campos destacados.", errors, values };
  }

  const db = getDb();
  if (!db) {
    console.error("[lead] banco não configurado. Verifique DATABASE_URL nas variáveis de ambiente.");
    return { status: "error", message: "Não conseguimos enviar agora. Tente novamente em instantes.", values };
  }

  try {
    // sem RETURNING: o usuário do site não tem permissão de leitura, e nem precisa
    await db.query("insert into leads (name, email, company, source) values ($1, $2, $3, 'landing')", [
      values.name,
      values.email,
      values.company,
    ]);
  } catch (err) {
    // 23505 = e-mail já cadastrado: para quem preencheu, o resultado é o mesmo
    const code = (err as { code?: string }).code;
    if (code !== "23505") {
      console.error("[lead] falha ao inserir no banco:", code, (err as Error).message);
      return { status: "error", message: "Não conseguimos enviar agora. Tente novamente em instantes.", values };
    }
  }

  return { status: "success" };
}
