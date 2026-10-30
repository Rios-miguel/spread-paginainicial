import type { Metadata } from "next";
import { BinanceExploitDashboard } from "@/components/BinanceExploitDashboard";

export const metadata: Metadata = {
  title: "Exploit Binance: Rastro ao Vivo dos Bilhões · Spread",
  description:
    "Acompanhamento on-chain em tempo real do exploit da Binance de outubro de 2026. Rastreamento multirrede, score de taint e congelamento Tether/Circle.",
};

export default function AoVivoPage() {
  return <BinanceExploitDashboard />;
}
