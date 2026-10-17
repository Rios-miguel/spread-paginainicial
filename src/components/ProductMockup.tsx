/**
 * Mockup do produto (Passo 2.4): painel falso com grafo de dispersão, KPIs, alertas e risco por camada.
 * É ilustrativo: valores fixos, inspirados no cenário de demonstração da plataforma (golpe de US$ 10 mil).
 */

type NodeKind = "origin" | "wallet" | "dex" | "bridge" | "deposit" | "inferred";
type GNode = { id: string; x: number; y: number; score: number; kind: NodeKind; label?: string; tone?: "reter" | "analisar" | "ok" };

const nodes: GNode[] = [
  { id: "o", x: 56, y: 200, score: 100, kind: "origin", label: "X · origem" },
  // camada 1
  { id: "a1", x: 176, y: 72, score: 100, kind: "wallet" },
  { id: "a2", x: 176, y: 136, score: 100, kind: "wallet" },
  { id: "a3", x: 176, y: 200, score: 100, kind: "wallet" },
  { id: "a4", x: 176, y: 264, score: 100, kind: "wallet" },
  { id: "a5", x: 176, y: 328, score: 100, kind: "wallet" },
  // camada 2
  { id: "b1", x: 318, y: 44, score: 100, kind: "wallet" },
  { id: "b2", x: 318, y: 92, score: 96, kind: "wallet" },
  { id: "b3", x: 318, y: 140, score: 100, kind: "wallet" },
  { id: "b4", x: 318, y: 188, score: 71, kind: "wallet" },
  { id: "b5", x: 318, y: 236, score: 100, kind: "wallet" },
  { id: "b6", x: 318, y: 284, score: 88, kind: "wallet" },
  { id: "b7", x: 318, y: 330, score: 20, kind: "wallet", label: "vendedor P2P · 20%" },
  { id: "b8", x: 318, y: 372, score: 1, kind: "wallet", label: "baleia · 0,99%" },
  // pontos de alerta
  { id: "dex", x: 462, y: 104, score: 100, kind: "dex", label: "Swap DEX" },
  { id: "br", x: 462, y: 252, score: 100, kind: "bridge", label: "Bridge" },
  // tentativas de saque
  { id: "d1", x: 616, y: 60, score: 100, kind: "deposit", label: "Exchange A", tone: "reter" },
  { id: "d2", x: 616, y: 168, score: 98, kind: "deposit", label: "Exchange B", tone: "reter" },
  { id: "d3", x: 616, y: 276, score: 95, kind: "inferred", label: "BX_0 · inferida", tone: "analisar" },
];

const edges: [string, string, number][] = [
  ["o", "a1", 3], ["o", "a2", 3], ["o", "a3", 3], ["o", "a4", 3], ["o", "a5", 3],
  ["a1", "b1", 2], ["a1", "b2", 2], ["a2", "b3", 2], ["a2", "b4", 1.5], ["a3", "b4", 2],
  ["a3", "b5", 2], ["a4", "b6", 2], ["a4", "b5", 1.5], ["a5", "b7", 1], ["a5", "b8", 0.8],
  ["b1", "dex", 2], ["b2", "dex", 2], ["b3", "dex", 1.5], ["b3", "d2", 2],
  ["b5", "br", 2], ["b6", "br", 1.5], ["b4", "br", 1],
  ["dex", "d1", 2.5], ["dex", "d2", 1.5], ["br", "d3", 2],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

/** cinza (limpo) → laranja da marca (100% de golpe), como no painel real */
function scoreColor(score: number) {
  const t = Math.max(0, Math.min(1, score / 100));
  const from = [74, 85, 99];
  const to = [242, 106, 27];
  const c = from.map((f, i) => Math.round(f + (to[i] - f) * t));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

function GraphNode({ n }: { n: GNode }) {
  const fill = scoreColor(n.score);
  if (n.kind === "origin") {
    return (
      <g>
        <circle cx={n.x} cy={n.y} r={20} fill="#f26a1b" opacity={0.18} className="live-dot" />
        <circle cx={n.x} cy={n.y} r={11} fill="#0d1316" stroke="#f26a1b" strokeWidth={3.5} />
      </g>
    );
  }
  if (n.kind === "dex") {
    return <rect x={n.x - 12} y={n.y - 12} width={24} height={24} rx={5} fill="#0d1316" stroke="#00ffff" strokeWidth={2} />;
  }
  if (n.kind === "bridge") {
    return <rect x={n.x - 11} y={n.y - 11} width={22} height={22} rx={3} transform={`rotate(45 ${n.x} ${n.y})`} fill="#0d1316" stroke="#d2fb7a" strokeWidth={2} />;
  }
  if (n.kind === "deposit") {
    return <rect x={n.x - 12} y={n.y - 12} width={24} height={24} rx={5} fill="#0d1316" stroke="#f26a1b" strokeWidth={3} />;
  }
  if (n.kind === "inferred") {
    return <circle cx={n.x} cy={n.y} r={10} fill="#0d1316" stroke="#00ffff" strokeWidth={2} strokeDasharray="3 3" />;
  }
  return <circle cx={n.x} cy={n.y} r={n.score < 30 ? 7 : 8} fill={fill} stroke="#131b1f" strokeWidth={2} />;
}

function Graph() {
  return (
    <svg viewBox="0 0 720 400" className="h-auto w-full" role="img" aria-labelledby="graph-title">
      <title id="graph-title">
        Grafo de dispersão: a carteira de origem espalha o valor em duas camadas, passa por um swap e uma bridge e chega a
        três tentativas de saque em exchanges, marcadas como reter ou analisar.
      </title>
      {/* colunas de camada */}
      {[
        { x: 56, t: "Origem" },
        { x: 176, t: "Camada 1" },
        { x: 318, t: "Camada 2" },
        { x: 462, t: "Swap · Bridge" },
        { x: 616, t: "Saque" },
      ].map((c) => (
        <text key={c.t} x={c.x} y={396} textAnchor="middle" className="fill-white/30 font-mono text-[10px] uppercase tracking-widest">
          {c.t}
        </text>
      ))}

      {edges.map(([s, t, w]) => {
        const a = byId[s];
        const b = byId[t];
        const mx = (a.x + b.x) / 2;
        const d = `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
        const col = scoreColor(b.score);
        const faint = b.score < 30;
        return (
          <g key={`${s}-${t}`}>
            <path d={d} fill="none" stroke={col} strokeOpacity={faint ? 0.25 : 0.35} strokeWidth={w} />
            {!faint && <path d={d} fill="none" stroke={col} strokeWidth={Math.max(1, w - 0.5)} className="edge-flow" />}
          </g>
        );
      })}

      {nodes.map((n) => (
        <GraphNode key={n.id} n={n} />
      ))}

      {/* rótulos */}
      {nodes
        .filter((n) => n.label)
        .map((n) => {
          const right = n.kind === "deposit" || n.kind === "inferred";
          const below = n.kind === "dex" || n.kind === "bridge" || n.kind === "origin";
          return (
            <text
              key={`l-${n.id}`}
              x={right ? n.x - 18 : below ? n.x : n.x + 14}
              y={below ? n.y + 30 : n.y + 4}
              textAnchor={right ? "end" : below ? "middle" : "start"}
              className={`font-mono text-[10.5px] ${n.score < 30 ? "fill-white/45" : "fill-white/75"}`}
            >
              {n.label}
            </text>
          );
        })}

      {/* selos de decisão nas tentativas de saque */}
      {nodes
        .filter((n) => n.tone)
        .map((n) => (
          <g key={`t-${n.id}`} transform={`translate(${n.x + 18} ${n.y - 9})`}>
            <rect width={n.tone === "reter" ? 46 : 64} height={18} rx={4} fill={n.tone === "reter" ? "#f26a1b" : "rgb(245 176 65 / 0.18)"} stroke={n.tone === "reter" ? "none" : "#f5b041"} />
            <text x={n.tone === "reter" ? 23 : 32} y={12.5} textAnchor="middle" className={`font-mono text-[9.5px] font-medium ${n.tone === "reter" ? "fill-[#131b1f]" : "fill-[#f5b041]"}`}>
              {n.tone === "reter" ? "RETER" : "ANALISAR"}
            </text>
          </g>
        ))}
    </svg>
  );
}

const kpis = [
  { k: "Carteiras no rastro", v: "49" },
  { k: "Valor sujo seguido", v: "US$ 9.412" },
  { k: "Saques retidos", v: "2", hot: true },
  { k: "Flags on-chain", v: "31" },
];

const alerts = [
  { tone: "reter", title: "Exchange A · depósito", meta: "4.120 USDC · score 100%", time: "14:02:11" },
  { tone: "reter", title: "Exchange B · depósito", meta: "2.870 USDC · score 98%", time: "14:02:13" },
  { tone: "analisar", title: "Saída de bridge (BX_0)", meta: "inferida · só alerta, sem Flag", time: "14:04:40" },
  { tone: "ok", title: "Baleia · consulta de risco", meta: "0,99% · aceita", time: "14:05:02" },
] as const;

const toneStyle = {
  reter: "border-l-brand",
  analisar: "border-l-warn",
  ok: "border-l-ok",
} as const;

const layers = [
  { l: "Camada 1", v: 100 },
  { l: "Camada 2", v: 84 },
  { l: "Swap", v: 78 },
  { l: "Bridge", v: 61 },
  { l: "Saques", v: 72 },
];

export function ProductMockup() {
  return (
    <section id="produto" aria-labelledby="produto-title" className="relative bg-[linear-gradient(to_bottom,var(--color-ink)_0%,var(--color-ink)_55%,var(--color-paper)_55%)] pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">O produto</p>
          <h2 id="produto-title" className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Veja o golpe se espalhar. <span className="text-gradient">Pare no saque.</span>
          </h2>
          <p className="mt-5 text-lg text-muted text-pretty">
            Grafo ao vivo, score de cada carteira com o porquê e a fila de decisões da sua mesa de compliance, num só
            painel.
          </p>
        </div>

        <figure className="reveal relative mt-14">
          {/* brilho laranja atrás do painel */}
          <div aria-hidden="true" className="absolute inset-x-10 -top-6 bottom-10 -z-10 rounded-[2rem] bg-brand opacity-20 blur-[100px]" />

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f171b] shadow-[0_40px_120px_-30px_rgb(0_0_0/0.7),0_0_0_1px_rgb(242_106_27/0.12)]">
            {/* barra do navegador */}
            <div className="flex items-center gap-4 border-b border-white/[0.06] bg-ink-deep px-4 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-3 rounded-full bg-white/15" />
                <span className="size-3 rounded-full bg-white/15" />
                <span className="size-3 rounded-full bg-white/15" />
              </div>
              <div className="mx-auto w-full max-w-md truncate rounded-md bg-white/[0.05] px-3 py-1 text-center font-mono text-[11px] text-muted">
                app.spread.com.br/casos/2026-1001-0042
              </div>
            </div>

            {/* cabeçalho do caso */}
            <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.06] px-5 py-4">
              <span className="font-semibold">Caso 2026-1001-0042</span>
              <span className="rounded-md border border-danger/40 bg-danger/10 px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-danger">
                confirmado
              </span>
              <span className="font-mono text-[11px] text-muted">MED · banco de origem no canal</span>
              <span className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-brand-light">
                <span className="live-dot size-1.5 rounded-full bg-brand" aria-hidden="true" />
                ao vivo
              </span>
            </div>

            <div className="grid gap-px bg-white/[0.06] lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="bg-[#0f171b] p-5">
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {kpis.map((k) => (
                    <div key={k.k} className={`rounded-xl border bg-white/[0.02] px-4 py-3 ${k.hot ? "border-brand/40 shadow-[inset_0_2px_0_var(--color-brand)]" : "border-white/[0.06]"}`}>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">{k.k}</dt>
                      <dd className={`mt-1 text-xl font-semibold tabular-nums ${k.hot ? "text-brand-light" : "text-white"}`}>{k.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="bg-grid mt-4 rounded-xl border border-white/[0.06] p-2 sm:p-4">
                  <Graph />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] text-muted">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-16 rounded bg-[linear-gradient(90deg,#4a5563,#f26a1b)]" aria-hidden="true" />
                    taint 0% → 100%
                  </span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm border-2 border-brand" aria-hidden="true" />conta de exchange</span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm border-2 border-neon-cyan" aria-hidden="true" />swap dex</span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm border-2 border-neon-lime" aria-hidden="true" />bridge</span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-full border border-dashed border-neon-cyan" aria-hidden="true" />inferida</span>
                </div>
              </div>

              <aside className="flex flex-col gap-px bg-white/[0.06]" aria-label="Painel lateral do caso">
                <div className="bg-[#0f171b] p-5">
                  <h3 className="border-b border-white/[0.06] pb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                    Tentativas de saque
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {alerts.map((a) => (
                      <li key={a.title} className={`rounded-lg border-l-[3px] bg-white/[0.03] px-3 py-2 ${toneStyle[a.tone]}`}>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[13px] font-medium">{a.title}</span>
                          <span className="font-mono text-[10px] text-muted">{a.time}</span>
                        </div>
                        <span className="font-mono text-[11px] text-muted">{a.meta}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#0f171b] p-5">
                  <h3 className="border-b border-white/[0.06] pb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                    Risco médio por etapa
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {layers.map((l) => (
                      <li key={l.l} className="grid grid-cols-[72px_1fr_36px] items-center gap-3 font-mono text-[11px]">
                        <span className="text-muted">{l.l}</span>
                        <span className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <span className="block h-full rounded-full bg-[linear-gradient(90deg,#ff9a5c,#f26a1b)]" style={{ width: `${l.v}%` }} />
                        </span>
                        <span className="text-right tabular-nums text-white/80">{l.v}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 bg-[#0f171b] p-5">
                  <h3 className="border-b border-white/[0.06] pb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                    API de risco
                  </h3>
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-ink-deep p-3 font-mono text-[11px] leading-relaxed text-white/80">
                    <span className="text-brand-light">GET</span> /risk/7xKX…9fQ{"\n"}
                    {"{"}{"\n"}
                    {"  "}<span className="text-muted">&quot;score&quot;</span>: 100,{"\n"}
                    {"  "}<span className="text-muted">&quot;recomendacao&quot;</span>: <span className="text-brand">&quot;bloquear&quot;</span>,{"\n"}
                    {"  "}<span className="text-muted">&quot;caminho&quot;</span>: [&quot;X&quot;, &quot;L1_3&quot;, &quot;DEX&quot;]{"\n"}
                    {"}"}
                  </pre>
                </div>
              </aside>
            </div>
          </div>
          <figcaption className="mt-5 text-center text-sm text-muted-light">
            Painel ilustrativo, com dados do cenário de demonstração (golpe de US$ 10 mil pulverizado em camadas).
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
