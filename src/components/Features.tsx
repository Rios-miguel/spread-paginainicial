type Piece = {
  tag: string;
  title: string;
  lead: string;
  talks: string[];
  alone: string;
  hoverBorder: string;
  hoverShadow: string;
  tagColor: string;
  bulletColor: string;
  accent: string;
};

/** Cada peça da esteira: o que entrega, com quem conversa e o que faz sozinha. */
const pieces: Piece[] = [
  {
    tag: "01",
    title: "Travel Rule",
    lead: "Troca as informações de remetente e beneficiário com a outra instituição, como o Banco Central exige.",
    talks: [
      "Pede a decisão dos Motores antes de o saque seguir para outra exchange",
      "Recebe do Validador a prova de que a carteira autocustodiada é do cliente",
      "Leva o risco da carteira, vindo do Antifraude, para a mesma decisão",
    ],
    alone: "Sozinho, cumpre a norma: confere a contraparte no BCB e troca os dados com qualquer instituição.",
    hoverBorder: "hover:border-brand",
    hoverShadow: "hover:shadow-[0_0_32px_-6px_rgb(242_106_27/0.45)]",
    tagColor: "group-hover:text-brand",
    bulletColor: "bg-brand",
    accent: "text-brand-light",
  },
  {
    tag: "02",
    title: "Motores",
    lead: "Decidem cada saque e cada depósito pelo perfil do cliente: aprovam, retêm ou bloqueiam, com o motivo.",
    talks: [
      "Respondem ao Travel Rule se o saque pode seguir",
      "Usam o score do Antifraude como mais um sinal da decisão",
      "Mandam ao compliance a fila do que foi retido, já explicada",
    ],
    alone: "Sozinhos, funcionam com o Travel Rule de qualquer fornecedor: Spread, Notabene, Sumsub ou outro.",
    hoverBorder: "hover:border-neon-lime",
    hoverShadow: "hover:shadow-[0_0_32px_-6px_rgb(210_251_122/0.45)]",
    tagColor: "group-hover:text-neon-lime",
    bulletColor: "bg-neon-lime",
    accent: "text-neon-lime",
  },
  {
    tag: "03",
    title: "Antifraude",
    lead: "Segue o dinheiro de golpe na blockchain e sinaliza a carteira que o recebeu, antes do saque.",
    talks: [
      "Entrega aos Motores o score da carteira e o caminho até a origem",
      "Avisa quando o dinheiro chega a uma conta de depósito da exchange",
      "Monta o relatório do caso para pedir o congelamento à Tether e à Circle",
    ],
    alone: "Sozinho, é uma API de risco: ok, alertar ou bloquear, nos limites que você define.",
    hoverBorder: "hover:border-neon-cyan",
    hoverShadow: "hover:shadow-[0_0_32px_-6px_rgb(0_255_255/0.45)]",
    tagColor: "group-hover:text-neon-cyan",
    bulletColor: "bg-neon-cyan",
    accent: "text-neon-cyan",
  },
  {
    tag: "04",
    title: "Validador",
    lead: "Prova que a carteira autocustodiada é mesmo do cliente, com a assinatura da própria carteira.",
    talks: [
      "Anexa a prova ao saque no Travel Rule e à trilha de auditoria",
      "Dá aos Motores a certeza de para quem o dinheiro vai",
      "Recusa a prova feita para outro saque ou outra instituição",
    ],
    alone: "Sozinho, valida carteiras em EVM, Tron, Solana e Bitcoin para qualquer fluxo da instituição.",
    hoverBorder: "hover:border-white/40",
    hoverShadow: "hover:shadow-[0_0_32px_-6px_rgb(255_255_255/0.25)]",
    tagColor: "group-hover:text-white",
    bulletColor: "bg-white/70",
    accent: "text-white",
  },
];

export function Features() {
  return (
    <section id="solucao" aria-labelledby="solucao-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">A solução</p>
          <h2 id="solucao-title" className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Um ecossistema pensado contra fraudes <span className="text-gradient">para reter o golpe</span>
          </h2>
          <p className="mt-5 text-lg text-muted text-pretty">
            Quatro peças que conversam entre si: cada uma passa à seguinte o que sabe, e a decisão sai com tudo junto.
            E cada uma funciona sozinha, para você começar pela que precisa hoje.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pieces.map((p) => (
            <li
              key={p.title}
              className={`reveal group relative flex flex-col rounded-2xl border border-white/[0.06] bg-surface p-7 transition duration-300 hover:-translate-y-1 ${p.hoverBorder} ${p.hoverShadow}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <span className={`font-mono text-sm text-white/25 transition ${p.tagColor}`}>{p.tag}</span>
              </div>
              <p className="mt-3 text-[15px] text-muted">{p.lead}</p>

              <p className="mt-6 border-t border-white/[0.06] pt-5 font-mono text-[11px] uppercase tracking-wider text-muted">
                Conversa com as outras peças
              </p>
              <ul className="mt-3 space-y-3 text-sm text-white/80">
                {p.talks.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className={`mt-2 size-1.5 shrink-0 rounded-full ${p.bulletColor}`} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-6 text-sm">
                <span className={`font-semibold ${p.accent}`}>Independente. </span>
                <span className="text-white/80">{p.alone}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
