const steps = [
  {
    n: "01",
    title: "O saque chega",
    text: "O cliente pede o saque e diz o destino: outra instituição ou carteira própria. O Travel Rule recebe o pedido.",
  },
  {
    n: "02",
    title: "Os Motores decidem",
    text: "Antes de qualquer coisa sair, os Motores olham o perfil do cliente e respondem: aprovado, retido ou bloqueado, com o motivo.",
  },
  {
    n: "03",
    title: "A outra ponta responde",
    text: "Com o aprovado, o Travel Rule confere a contraparte no BCB e troca as informações. A outra instituição confere o cliente dela e aceita ou recusa.",
  },
  {
    n: "04",
    title: "Liberação com as duas respostas",
    text: "Só com o aprovado dos Motores e o aceite da outra ponta o saque vai para a blockchain. No depósito, o caminho é o mesmo, ao contrário.",
  },
];

const safeguards = [
  { title: "Nunca aprovado no silêncio", text: "Sem resposta dos Motores ou da contraparte, o saque vai para o seu compliance." },
  { title: "Dado ausente nunca aprova", text: "Se falta informação para decidir, os Motores retêm e dizem o que falta." },
  { title: "Você decide o apetite", text: "A régua de risco é da sua instituição, com simulação antes de entrar em vigor." },
  { title: "Tudo registrado", text: "Cada decisão, dos Motores e do Travel Rule, fica na trilha com o motivo." },
];

const stats = [
  {
    v: "R$ 8,90",
    d: "é o que volta à vítima de cada R$ 100 roubados em golpes no Pix (jan/2022–abr/2026).",
    src: "O Povo, 2026",
    href: "https://mais.opovo.com.br/reportagens-especiais/2026/07/24/a-cada-rs-100-em-golpes-no-pix-instituicoes-devolvem-apenas-rs-890.html",
  },
  {
    v: "31,9 mi",
    d: "operações de compra e venda de criptoativos no Brasil em um só mês (nov/2024).",
    src: "Receita Federal",
    href: "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/declaracoes-e-demonstrativos/criptoativos/arquivos/criptoativos_dados_abertos_20250822.pdf",
  },
  {
    v: "~80%",
    d: "do volume cripto declarado à Receita em 2025 foi em stablecoins.",
    src: "BPMoney",
    href: "https://bpmoney.com.br/mercado/cripto/stablecoins-concentram-80-operacoes-criptoativos-receita-federal/",
  },
];

/** Linha do tempo ilustrativa de dois saques: um liberado, um retido. */
const timeline = [
  { tone: "info", who: "Pedido", what: "1.500 USDT → Exchange B", time: "14:02:11.204" },
  { tone: "ok", who: "Motores", what: "aprovado · dentro da régua do cliente", time: "14:02:11.205" },
  { tone: "ok", who: "Travel Rule", what: "Exchange B autorizada pelo BCB · dados enviados", time: "14:02:11.630" },
  { tone: "ok", who: "Exchange B", what: "aceite · cliente e nome conferem", time: "14:02:12.910" },
  { tone: "ok", who: "Liberado", what: "saque segue para a blockchain", time: "14:02:12.912" },
  { tone: "info", who: "Pedido", what: "48.000 USDT → carteira própria", time: "14:05:40.017" },
  { tone: "hold", who: "Motores", what: "retido · acima da capacidade comprovada", time: "14:05:40.018" },
  { tone: "hold", who: "Compliance", what: "na fila, com o motivo e a conta", time: "14:05:40.019" },
] as const;

const toneStyle = {
  info: "border-l-white/30",
  ok: "border-l-ok",
  hold: "border-l-brand",
} as const;

function Box({
  x, y, w, h, title, sub, stroke, dashed,
}: { x: number; y: number; w: number; h: number; title: string; sub: string; stroke: string; dashed?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#0d1316" stroke={stroke} strokeWidth={dashed ? 1.5 : 2}
        strokeDasharray={dashed ? "5 4" : undefined} />
      <text x={x + w / 2} y={y + h / 2 - 3} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={600}>{title}</text>
      <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fill="#9aa4ad" fontSize={10.5}
        fontFamily="var(--font-plex-mono), monospace">{sub}</text>
    </g>
  );
}

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "middle" | "start" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill="#9aa4ad" fontSize={10} fontFamily="var(--font-plex-mono), monospace">
      {children}
    </text>
  );
}

/** Desenho do fluxo: só as peças e o que passa entre elas, sem detalhe de arquitetura. */
function Flow() {
  const brand = "#f26a1b";
  const lime = "#d2fb7a";
  const cyan = "#00ffff";
  const white = "rgb(255 255 255 / 0.55)";
  return (
    <svg viewBox="0 0 760 350" className="h-auto w-full min-w-[640px]" role="img"
      aria-label="O pedido de saque chega ao Travel Rule, que pede a decisão aos Motores; com o aprovado, troca as informações com a outra instituição e, com o aceite, libera o saque para a blockchain. O Antifraude alimenta os Motores e o Validador alimenta o Travel Rule.">
      <defs>
        <marker id="arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill="#9aa4ad" />
        </marker>
      </defs>

      {/* fios */}
      <g fill="none" strokeWidth={2} markerEnd="url(#arw)">
        <path d="M150 180H218" stroke={brand} className="edge-flow" />
        <path d="M290 150V92" stroke={lime} className="edge-flow" />
        <path d="M310 92V148" stroke={lime} className="edge-flow" />
        <path d="M380 172H448" stroke={brand} className="edge-flow" />
        <path d="M450 190H382" stroke={brand} className="edge-flow" />
        <path d="M300 212C300 262 690 262 690 212" stroke={brand} className="edge-flow" />
        <path d="M150 60H218" stroke={cyan} strokeDasharray="4 6" strokeWidth={1.5} />
        <path d="M150 300C190 300 190 200 218 200" stroke={white} strokeDasharray="4 6" strokeWidth={1.5} />
      </g>

      <Label x={184} y={172}>saque</Label>
      <Label x={284} y={124} anchor="end">pergunta</Label>
      <Label x={316} y={124} anchor="start">decide</Label>
      <Label x={415} y={164}>dados</Label>
      <Label x={415} y={206}>aceite</Label>
      <Label x={495} y={275}>liberado com as duas respostas</Label>
      <Label x={184} y={52}>score</Label>
      <Label x={186} y={292}>prova</Label>

      <Box x={20} y={150} w={130} h={60} title="Cliente" sub="pede o saque" stroke={white} />
      <Box x={220} y={150} w={160} h={62} title="Travel Rule" sub="contraparte · dados" stroke={brand} />
      <Box x={220} y={30} w={160} h={62} title="Motores" sub="aprova · retém · bloqueia" stroke={lime} />
      <Box x={20} y={30} w={130} h={60} title="Antifraude" sub="risco da carteira" stroke={cyan} dashed />
      <Box x={20} y={270} w={130} h={60} title="Validador" sub="carteira própria" stroke={white} dashed />
      <Box x={450} y={150} w={150} h={62} title="Outra instituição" sub="confere e aceita" stroke={white} />
      <Box x={630} y={150} w={115} h={62} title="Blockchain" sub="saque enviado" stroke={brand} />

      {/* pontos opcionais */}
      <Label x={85} y={18}>opcional</Label>
      <Label x={85} y={346}>opcional</Label>
    </svg>
  );
}

/** Seção clara (branco + laranja da marca), em contraste com o restante da página escura. */
export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className="relative bg-paper text-ink">
      <div aria-hidden="true" className="bg-grid-light absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_70%,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-deep">Como funciona</p>
          <h2 id="como-title" className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Ecossistema completo na tomada de decisão
          </h2>
          <p className="mt-5 text-lg text-muted-light text-pretty">
            O Travel Rule cuida da outra ponta; os Motores cuidam do seu cliente. Nenhum saque sai antes de os dois
            responderem, e cada resposta fica registrada com o motivo.
          </p>
        </div>

        <figure className="reveal relative mt-14">
          <div aria-hidden="true" className="absolute inset-x-10 -top-6 bottom-10 -z-10 rounded-[2rem] bg-brand opacity-15 blur-[100px]" />
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f171b] text-white shadow-[0_40px_120px_-30px_rgb(0_0_0/0.5),0_0_0_1px_rgb(242_106_27/0.12)]">
            <div className="flex items-center gap-4 border-b border-white/[0.06] bg-ink-deep px-4 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-3 rounded-full bg-white/15" />
                <span className="size-3 rounded-full bg-white/15" />
                <span className="size-3 rounded-full bg-white/15" />
              </div>
              <div className="mx-auto w-full max-w-md truncate rounded-md bg-white/[0.05] px-3 py-1 text-center font-mono text-[11px] text-muted">
                Motores + Travel Rule · saques de hoje
              </div>
            </div>

            <div className="grid gap-px bg-white/[0.06] lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="min-w-0 bg-[#0f171b] p-5">
                <div className="bg-grid overflow-x-auto rounded-xl border border-white/[0.06] p-2 sm:p-4">
                  <Flow />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] text-muted">
                  <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm border-2 border-brand" aria-hidden="true" />Travel Rule</span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm border-2 border-neon-lime" aria-hidden="true" />Motores</span>
                  <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm border border-dashed border-white/60" aria-hidden="true" />peça opcional</span>
                </div>
              </div>

              <aside className="bg-[#0f171b] p-5" aria-label="Linha do tempo de dois saques">
                <h3 className="border-b border-white/[0.06] pb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                  Linha do tempo
                </h3>
                <ul className="mt-3 space-y-2">
                  {timeline.map((t) => (
                    <li key={t.time} className={`rounded-lg border-l-[3px] bg-white/[0.03] px-3 py-2 ${toneStyle[t.tone]}`}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-medium">{t.who}</span>
                        <span className="font-mono text-[10px] text-muted">{t.time}</span>
                      </div>
                      <span className="font-mono text-[11px] text-muted">{t.what}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
          <figcaption className="mt-5 text-center text-sm text-muted-light">
            Desenho ilustrativo: as peças e o que passa entre elas. Os horários e valores são de exemplo.
          </figcaption>
        </figure>

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className="reveal relative rounded-2xl border border-brand/15 bg-white p-7 shadow-[0_8px_32px_rgb(242_106_27/0.08)]">
              <span className="font-mono text-sm font-medium text-brand-deep">{s.n}</span>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute top-9 -right-4 hidden h-px w-8 bg-gradient-to-r from-brand/50 to-transparent lg:block" />
              )}
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-light">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="reveal mt-20 grid gap-10 rounded-3xl bg-paper-warm p-8 ring-1 ring-brand/15 sm:p-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Decisão com o porquê</h3>
            <p className="mt-4 text-muted-light">
              Saque travado sem motivo custa cliente, e saque liberado sem as informações custa a autorização. Por
              isso cada decisão vem com o motivo, e as salvaguardas estão no produto.
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {safeguards.map((g) => (
              <li key={g.title} className="flex gap-3">
                <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-9.86a.75.75 0 0 0-1.22-.88l-3.24 4.5-1.6-1.6a.75.75 0 1 0-1.06 1.06l2.22 2.22a.75.75 0 0 0 1.14-.09l3.76-5.21Z" clipRule="evenodd" />
                </svg>
                <span>
                  <span className="block font-semibold">{g.title}</span>
                  <span className="text-[15px] text-muted-light">{g.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-20 grid gap-10 border-t border-brand/15 pt-14 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.v} className="reveal">
              <dt className="text-4xl font-semibold tracking-tight text-brand-deep sm:text-5xl">{s.v}</dt>
              <dd>
                <span className="mt-3 block text-muted-light">{s.d}</span>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-mono text-xs text-muted-light underline decoration-brand/40 underline-offset-4 hover:text-brand-deep">
                  Fonte: {s.src} ↗
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
