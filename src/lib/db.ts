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
  pool = url
    ? new Pool({
        connectionString: url,
        max: 3,
        // nenhum pedido fica preso esperando conexão ou query: com só 3 conexões, uma presa pesa
        connectionTimeoutMillis: 3_000,
        idleTimeoutMillis: 10_000,
        statement_timeout: 5_000,
        query_timeout: 6_000,
      })
    : null;
  return pool;
}
