import "server-only";

/**
 * Limite de envios do formulário, em memória (o site roda num processo só).
 * Dois cortes: por IP (um robô insistindo) e global (muitos IPs ao mesmo tempo),
 * que protege a cota do Brevo e o banco mesmo contra flood distribuído.
 */

type Bucket = { count: number; expiresAt: number };

const PER_IP = { limit: 5, windowMs: 10 * 60_000 };
const GLOBAL = { limit: 60, windowMs: 60 * 60_000 };
const MAX_TRACKED_IPS = 10_000;

const byIp = new Map<string, Bucket>();
let global: Bucket = { count: 0, expiresAt: 0 };

function purgeExpired(now: number): void {
  for (const [ip, b] of byIp) {
    if (now > b.expiresAt) byIp.delete(ip);
  }
}

/** Conta uma tentativa e diz se ela pode seguir. */
export function checkRateLimit(ip: string, now = Date.now()): boolean {
  if (now > global.expiresAt) global = { count: 0, expiresAt: now + GLOBAL.windowMs };
  if (global.count >= GLOBAL.limit) return false;

  let b = byIp.get(ip);
  if (!b || now > b.expiresAt) {
    if (byIp.size >= MAX_TRACKED_IPS) purgeExpired(now);
    // ainda cheio depois da limpeza: trata como flood e segura tudo até as janelas vencerem
    if (byIp.size >= MAX_TRACKED_IPS) return false;
    b = { count: 0, expiresAt: now + PER_IP.windowMs };
    byIp.set(ip, b);
  }
  if (b.count >= PER_IP.limit) return false;

  b.count += 1;
  global.count += 1;
  return true;
}

/**
 * IP de quem enviou. Em produção o tráfego só chega pela Cloudflare (o grupo de segurança
 * aceita só as faixas dela), que sempre sobrescreve CF-Connecting-IP; fora dela, cai no
 * último X-Forwarded-For (o que o proxy da frente acrescentou).
 */
export function clientIp(h: Headers): string {
  const cf = h.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  const xff = h.get("x-forwarded-for");
  const last = xff?.split(",").pop()?.trim();
  return last || "desconhecido";
}

/** Só para testes. */
export function _resetRateLimit(): void {
  byIp.clear();
  global = { count: 0, expiresAt: 0 };
}
