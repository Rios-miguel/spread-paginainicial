"use server";

import { validateLead, type LeadErrors, type LeadValues } from "@/lib/lead";
import { getSupabase } from "@/lib/supabase";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: LeadErrors;
  values?: LeadValues;
};

/** Recebe o formulário de contato e grava o lead no Supabase (insert-only). */
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

  const supabase = getSupabase();
  if (!supabase) {
    console.error("[lead] Supabase não configurado. Verifique SUPABASE_URL e SUPABASE_ANON_KEY nas variáveis de ambiente.");
    return {
      status: "error",
      message: "Configuração do banco pendente. Adicione SUPABASE_URL e SUPABASE_ANON_KEY na Vercel e faça um Redeploy.",
      values,
    };
  }

  // sem .select(): a chave anon não tem permissão de leitura, e nem precisa
  const { error } = await supabase.from("leads").insert({ ...values, source: "landing" });

  // 23505 = e-mail já cadastrado: para quem preencheu, o resultado é o mesmo
  if (error && error.code !== "23505") {
    console.error("[lead] falha ao inserir no Supabase:", error.code, error.message);
    return {
      status: "error",
      message: error.message || "Não conseguimos enviar agora. Tente novamente em instantes.",
      values,
    };
  }

  return { status: "success" };
}
