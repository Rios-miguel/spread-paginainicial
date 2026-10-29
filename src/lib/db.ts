import "server-only";
import { Pool } from "pg";

let pool: Pool | null | undefined;

/**
 * Conexão com o PostgreSQL da Spread (DATABASE_URL). O usuário do site só tem INSERT em leads:
 * não lê, não altera e não apaga nada (veja db/0001_leads.sql).
 */
export function getDb(): Pool | null {
  if (pool !== undefined) return pool;
  const url = process.env.DATABASE_URL?.trim();
  pool = url ? new Pool({ connectionString: url, max: 3 }) : null;
  return pool;
}
