"use client";

import { useEffect, useState } from "react";

type Fact = { k: string; v: string; d: string };

/** Destaques medidos de cada produto. Números de teste e simulação dizem que são de teste ou simulação. */
const facts: Fact[] = [
  { k: "Antifraude", v: "US$ 113,6 mi", d: "seguidos num só caso, entre 17 golpes reais reconstruídos" },
  { k: "Travel Rule", v: "20 mil saques", d: "com um processo do servidor derrubado: nada perdido nem duplicado" },
  { k: "Motores", v: "0,6 ms", d: "para decidir cada saque ou depósito (p95, em modo sombra)" },
  { k: "Inteligência de mercado", v: "Sanções", d: "OFAC, ONU, congelamentos da Tether e da Circle e os principais mixers" },
  { k: "Antifraude", v: "8 redes", d: "Bitcoin, Ethereum, Solana, Tron, TON, Arbitrum, Polygon e Robinhood Chain" },
  { k: "Travel Rule", v: "96 saques/s", d: "processados no teste de carga, com a contraparte conferida no BCB" },
  { k: "Motores", v: "92%", d: "das fraudes de entrada contidas na simulação com 3 mil clientes" },
  { k: "Validador", v: "4 redes", d: "EVM, Tron, Solana e Bitcoin: a carteira assina e prova que é do cliente" },
  { k: "Motores", v: "6,5 mil/s", d: "movimentações decididas por segundo, dentro da rede da exchange" },
];

const PER_PAGE = 3;
const pages = Array.from({ length: Math.ceil(facts.length / PER_PAGE) }, (_, i) =>
  facts.slice(i * PER_PAGE, i * PER_PAGE + PER_PAGE),
);
const INTERVAL_MS = 5000;

/** Faixa de destaques que troca sozinha a cada 5 s; para quando o mouse está em cima ou o foco está dentro. */
export function HeroFacts() {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;
    const t = window.setTimeout(() => setPage((p) => (p + 1) % pages.length), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [page, paused]);

  return (
    <div
      className="mx-auto mt-16 max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-line">
        <dl
          key={page}
          aria-live="polite"
          className="hero-facts-in grid grid-cols-1 gap-px text-left sm:grid-cols-3"
        >
          {pages[page].map((s) => (
            <div key={s.k + s.v} className="bg-ink/90 px-6 py-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{s.k}</dt>
              <dd className="mt-1.5">
                <span className="block text-2xl font-semibold text-white">{s.v}</span>
                <span className="text-sm text-muted">{s.d}</span>
              </dd>
            </div>
          ))}
        </dl>
        {!paused && (
          <span
            key={`bar-${page}`}
            aria-hidden="true"
            className="hero-facts-bar absolute bottom-0 left-0 h-0.5 bg-brand"
          />
        )}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2" role="group" aria-label="Destaques">
        {pages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPage(i)}
            aria-label={`Destaques ${i + 1} de ${pages.length}`}
            aria-current={i === page}
            className={`h-1.5 rounded-full transition-all ${i === page ? "w-6 bg-brand" : "w-1.5 bg-white/25 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
