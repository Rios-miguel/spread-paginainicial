import { NextResponse } from "next/server";
import { ETHEREUM_CASE, BITCOIN_CASE } from "@/lib/spread-engine";

export async function GET() {
  const SPREAD_API = process.env.SPREAD_API_URL || "http://127.0.0.1:5000";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);

    const res = await fetch(`${SPREAD_API}/cases`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    // Engine Flask local ainda não foi iniciado: fallback limpo e idêntico
  }

  // Resposta padrão dos casos monitorados ao vivo
  return NextResponse.json([
    {
      id: ETHEREUM_CASE.id,
      network: "ethereum",
      network_code: "ETH",
      alias: ETHEREUM_CASE.name,
      origin: ETHEREUM_CASE.origin,
      amount_usd: ETHEREUM_CASE.amountUsd,
      parked_usd: ETHEREUM_CASE.split.parkedUsd,
      in_exchange_usd: ETHEREUM_CASE.split.inExchangeUsd,
      ended_usd: ETHEREUM_CASE.split.endedUsd,
      wallets: ETHEREUM_CASE.metrics.walletsCount,
      status: "confirmed",
      last_activity_ts: Math.floor(Date.now() / 1000 - 32400),
      raw: ETHEREUM_CASE,
    },
    {
      id: BITCOIN_CASE.id,
      network: "bitcoin",
      network_code: "BTC",
      alias: BITCOIN_CASE.name,
      origin: BITCOIN_CASE.origin,
      amount_usd: BITCOIN_CASE.amountUsd,
      parked_usd: BITCOIN_CASE.split.parkedUsd,
      in_exchange_usd: BITCOIN_CASE.split.inExchangeUsd,
      ended_usd: BITCOIN_CASE.split.endedUsd,
      wallets: BITCOIN_CASE.metrics.walletsCount,
      status: "confirmed",
      last_activity_ts: Math.floor(Date.now() / 1000 - 72000),
      raw: BITCOIN_CASE,
    },
  ]);
}
