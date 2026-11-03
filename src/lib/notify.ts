import "server-only";

import type { LeadValues } from "@/lib/lead";

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/**
 * Avisa o time por e-mail a cada lead novo (Brevo, domínio spread.app.br já autenticado).
 * Nunca lança erro: o lead já está gravado no banco; falha no aviso só vai para o log.
 */
export async function notifyNewLead(lead: LeadValues): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[lead] BREVO_API_KEY ausente: aviso por e-mail não enviado.");
    return;
  }
  const to = process.env.LEAD_NOTIFY_TO?.trim() || "contato@spread.app.br";
  const from = process.env.LEAD_NOTIFY_FROM?.trim() || "site@spread.app.br";

  const name = escapeHtml(lead.name);
  const email = escapeHtml(lead.email);
  const company = escapeHtml(lead.company || "-");
  const when = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  try {
    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "Site Spread", email: from },
        to: [{ email: to }],
        // responder o aviso vai direto para quem preencheu o formulário
        replyTo: { email: lead.email, name: lead.name },
        subject: `Novo lead no site: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
        htmlContent:
          `<p>Novo contato pelo formulário do site em ${when}.</p>` +
          `<p><b>Nome:</b> ${name}<br><b>E-mail:</b> ${email}<br><b>Empresa:</b> ${company}</p>` +
          `<p>Responda este e-mail para falar direto com a pessoa.</p>`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("[lead] falha no aviso por e-mail:", res.status, (await res.text()).slice(0, 300));
    }
  } catch (err) {
    console.error("[lead] falha no aviso por e-mail:", (err as Error).message);
  }
}
