import type { ReactNode } from "react";

type Pillar = {
  tag: string;
  title: string;
  lead: string;
  points: string[];
  icon: ReactNode;
  hoverBorder: string;
  hoverShadow: string;
  iconGlow: string;
  tagColor: string;
  bulletColor: string;
};

const icon = "size-6";

const pillars: Pillar[] = [
  {
    tag: "01",
    title: "Travel Rule",
    lead: "As informações de remetente e beneficiário que o Banco Central exige, em toda transferência e com qualquer contraparte.",
    points: [
      "Rede Spread e protocolo aberto TRP (OpenVASP): a outra ponta não precisa ser cliente",
      "Confere se a contraparte é autorizada pelo BCB, com a lista oficial atualizada todo dia",
      "Conector no seu ambiente: dados pessoais cifrados de ponta a ponta, a Spread não lê",
    ],
    hoverBorder: "hover:border-brand",
    hoverShadow: "hover:shadow-[0_0_32px_-6px_rgb(242_106_27/0.45)]",
    iconGlow: "border-brand/25 bg-brand/10 text-brand group-hover:bg-brand group-hover:text-ink",
    tagColor: "group-hover:text-brand",
    bulletColor: "bg-brand",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={icon} aria-hidden="true">
        <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    tag: "02",
    title: "Antifraude: reter o saque",
    lead: "Sinaliza a carteira que recebeu dinheiro de golpe para a exchange reter o saque a tempo.",
    points: [
      "Aviso quando o dinheiro chega a uma conta de depósito sua, com o caminho até a origem",
      "Score proporcional: quem recebeu um pouco misturado a dinheiro limpo não é tratado como golpista",
      "Atravessa os principais mixers, pontes e swaps; módulo em desenvolvimento, validado com 17 golpes reais",
    ],
    hoverBorder: "hover:border-neon-cyan",
    hoverShadow: "hover:shadow-[0_0_32px_-6px_rgb(0_255_255/0.45)]",
    iconGlow: "border-neon-cyan/25 bg-neon-cyan/10 text-neon-cyan group-hover:bg-neon-cyan group-hover:text-ink",
    tagColor: "group-hover:text-neon-cyan",
    bulletColor: "bg-neon-cyan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={icon} aria-hidden="true">
        <circle cx="5" cy="12" r="2.2" />
        <circle cx="18" cy="5.5" r="2.2" />
        <circle cx="18" cy="18.5" r="2.2" />
        <path d="M7 11 16 6.5M7 13l9 4.5" />
      </svg>
    ),
  },
  {
    tag: "03",
    title: "Compliance e auditoria",
    lead: "Cada decisão registrada com o motivo, pronta para a fiscalização.",
    points: [
      "Fila de comunicação ao Coaf: autocustodiada a partir de US$ 10 mil, prazo de 24 h",
      "Trilha de auditoria guardada por 5 anos, sem dado pessoal na Spread",
      "Relatório do caso de golpe pronto para pedir o congelamento à Tether e à Circle",
    ],
    hoverBorder: "hover:border-neon-lime",
    hoverShadow: "hover:shadow-[0_0_32px_-6px_rgb(210_251_122/0.45)]",
    iconGlow: "border-neon-lime/25 bg-neon-lime/10 text-neon-lime group-hover:bg-neon-lime group-hover:text-ink",
    tagColor: "group-hover:text-neon-lime",
    bulletColor: "bg-neon-lime",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={icon} aria-hidden="true">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="solucao" aria-labelledby="solucao-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">A solução</p>
          <h2 id="solucao-title" className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Uma integração para cumprir a norma <span className="text-gradient">e reter o golpe</span>
          </h2>
          <p className="mt-5 text-lg text-muted text-pretty">
            O Travel Rule que o Banco Central exige, e a inteligência da Spread para o dinheiro de golpe que vira
            cripto. Três pilares para a sua equipe de compliance.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <li
              key={p.title}
              className={`reveal group relative flex flex-col rounded-2xl border border-white/[0.06] bg-surface p-8 transition duration-300 hover:-translate-y-1 ${p.hoverBorder} ${p.hoverShadow}`}
            >
              <div className="flex items-center justify-between">
                <span className={`grid size-12 place-items-center rounded-xl border transition ${p.iconGlow}`}>
                  {p.icon}
                </span>
                <span className={`font-mono text-sm text-white/25 transition ${p.tagColor}`}>{p.tag}</span>
              </div>
              <h3 className="mt-7 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-muted">{p.lead}</p>
              <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6 text-sm text-white/80">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className={`mt-2 size-1.5 shrink-0 rounded-full ${p.bulletColor}`} aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
