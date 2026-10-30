import { NextResponse } from "next/server";
import { ALL_CASES } from "@/lib/spread-engine";

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

  // Resposta padrão com todos os casos disponíveis na Spread (vivos e históricos)
  return NextResponse.json(
    ALL_CASES.map((c) => ({
      id: c.id,
      network: c.chain,
      network_code: c.chain === "ethereum" ? "ETH" : c.chain === "bitcoin" ? "BTC" : "TRX",
      alias: c.name,
      origin: c.origin,
      is_live: c.isLive,
      category: c.category,
      amount_usd: c.amountUsd,
      parked_usd: c.split.parkedUsd,
      in_exchange_usd: c.split.inExchangeUsd,
      ended_usd: c.split.endedUsd,
      wallets: c.metrics.walletsCount,
      visual_nodes: c.metrics.visualCriticalNodesCount || c.metrics.walletsCount,
      layers: c.metrics.layersCount,
      status: "confirmed",
      raw: c,
    }))
  );
}
