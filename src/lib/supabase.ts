import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

function clean(val?: string) {
  if (!val) return "";
  return val.trim().replace(/^["']|["']$/g, "");
}

/**
 * Cliente Supabase do servidor com a chave anon/publishable.
 * Suporta tanto SUPABASE_URL / SUPABASE_ANON_KEY quanto os prefixos NEXT_PUBLIC_*.
 */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const url = clean(rawUrl);
  const key = clean(rawKey);

  client = url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  return client;
}
