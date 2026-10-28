import Link from "next/link";

interface PlanFeature {
  text: string;
  highlight?: boolean;
}

interface Plan {
  id: string;
  name: string;
  badge: string;
  tagColor: string;
  description: string;
  priceLabel: string;
  priceSub: string;
  isPopular?: boolean;
  buttonText: string;
  buttonHref: string;
  features: PlanFeature[];
}

const plans: Plan[] = [
  {
    id: "travel-rule",
    name: "Spread Travel Rule",
    badge: "RES. BCB 520/2025 · ARTS. 44 E 91",
    tagColor: "border-brand/40 bg-brand/10 text-brand-light",
    description:
      "Para exchanges, corretoras e bancos que prestam serviços de ativos virtuais: a troca de informações que o Banco Central exige, com qualquer contraparte, e a trilha para a fiscalização.",
    priceLabel: "Sob consulta",
    priceSub: "Mensalidade · Dimensionada pelo volume de transferências da instituição",
    isPopular: true,
    buttonText: "Acessar Spread Travel Rule →",
    buttonHref: "/login?product=travel-rule",
    features: [
      { text: "Informações do art. 44 em toda transferência, sem valor mínimo", highlight: true },
      { text: "Contraparte autorizada (art. 91) conferida na lista oficial do BCB, atualizada todo dia", highlight: true },
      { text: "Rede Spread e protocolo aberto TRP v3.2.1 (OpenVASP): fala com quem não é cliente" },
      { text: "Conector no seu ambiente: dados pessoais cifrados de ponta a ponta (X25519 + ChaCha20-Poly1305)" },
      { text: "Confirmação do beneficiário no seu cadastro e quarentena do depósito sem informação" },
      { text: "Autodeclaração do cliente para carteira autocustodiada (art. 89, §1º)" },
      { text: "Fila de comunicação ao Coaf: autocustodiada a partir de US$ 10 mil, prazo de 24 h" },
      { text: "Console de compliance e trilha de auditoria por 5 anos (art. 45)" },
      { text: "Testado com 20 mil saques e um processo do servidor derrubado: nada perdido nem duplicado" },
    ],
  },
  {
    id: "antifraude",
    name: "Inteligência Spread · Antifraude",
    badge: "MÓDULO EM DESENVOLVIMENTO",
    tagColor: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan",
    description:
      "Sinaliza a carteira que recebeu dinheiro de golpe para a exchange reter o saque antes de o valor sumir. Oferecido aos clientes do Travel Rule.",
    priceLabel: "Sob consulta",
    priceSub: "Módulo opcional · Junto com o Spread Travel Rule",
    buttonText: "Acessar Spread Antifraude →",
    buttonHref: "/login?product=antifraude",
    features: [
      { text: "Aviso quando dinheiro de golpe chega a uma conta de depósito sua, antes do saque", highlight: true },
      { text: "Score proporcional por carteira, com o caminho até a origem" },
      { text: "8 redes: Bitcoin, Ethereum, Solana, Tron, TON, Arbitrum, Polygon e Robinhood Chain" },
      { text: "Principais mixers no catálogo: Tornado Cash, Railgun, Privacy Pools, Privacy Cash, Tonnel e CoinJoin" },
      { text: "Carteiras da lista de sanções da OFAC e congeladas pela Tether e pela Circle" },
      { text: "API de risco: ok, alertar ou bloquear, nos limites que você define" },
      { text: "Relatório do caso para pedir o congelamento à Tether e à Circle" },
      { text: "Validado com 17 golpes reais, incluindo um hack de exchange de US$ 113,6 milhões" },
    ],
  },
];

export function Pricing() {
  return (
    <section id="planos" className="relative isolate overflow-hidden border-t border-line bg-ink py-24 sm:py-32">
      {/* Luz ambiente de fundo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/2 size-96 -translate-y-1/2 rounded-full bg-brand opacity-10 blur-[130px]" />
        <div className="absolute right-1/4 top-1/3 size-96 -translate-y-1/2 rounded-full bg-neon-lime opacity-10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Cabeçalho da seção */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 font-mono text-xs tracking-wide text-brand-light">
            <span className="live-dot size-1.5 rounded-full bg-brand" aria-hidden="true" />
            PLANOS INSTITUCIONAIS
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Escolha a arquitetura sob medida para a sua instituição
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            O Travel Rule para cumprir a norma do Banco Central e, junto dele, a inteligência da Spread para reter o
            saque do dinheiro de golpe.
          </p>
        </div>

        {/* Grade de 2 Planos */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 sm:p-10 ${
                plan.isPopular
                  ? "border-brand/70 bg-gradient-to-b from-surface/90 via-surface to-ink shadow-[0_0_50px_-12px_rgb(242_106_27/0.35)]"
                  : "border-line bg-surface/60 hover:border-white/20 hover:bg-surface/90 hover:shadow-[0_0_35px_-12px_rgb(0_255_255/0.2)]"
              }`}
            >
              {/* Selo de Destaque */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-1 text-xs font-bold tracking-wide text-ink shadow-[0_0_20px_rgb(242_106_27/0.6)]">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    PRODUTO PRINCIPAL
                  </span>
                </div>
              )}

              <div>
                {/* Badge do plano */}
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider ${plan.tagColor}`}
                  >
                    {plan.badge}
                  </span>
                </div>

                {/* Título e descrição */}
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">{plan.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{plan.description}</p>

                {/* Bloco de Preço */}
                <div className="mt-8 rounded-2xl border border-line bg-ink/70 p-5 backdrop-blur-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      {plan.priceLabel}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted">{plan.priceSub}</p>
                </div>

                {/* Lista de Recursos */}
                <div className="mt-8 space-y-3.5">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted">Recursos inclusos:</p>
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`mt-1 flex size-4 shrink-0 items-center justify-center rounded-full ${
                            feature.highlight
                              ? "bg-neon-lime text-ink"
                              : plan.isPopular
                              ? "bg-brand text-ink"
                              : "bg-neon-cyan text-ink"
                          }`}
                        >
                          <svg viewBox="0 0 16 16" fill="currentColor" className="size-3" aria-hidden="true">
                            <path
                              fillRule="evenodd"
                              d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className={feature.highlight ? "font-semibold text-white" : "text-muted"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botão de Ação que direciona para a aba de Login */}
              <div className="mt-10 pt-6 border-t border-line">
                <Link
                  href={plan.buttonHref}
                  className={`inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all duration-200 ${
                    plan.isPopular
                      ? "bg-neon-lime text-ink shadow-[0_0_24px_rgb(210_251_122/0.4)] hover:bg-[#bbf451] hover:shadow-[0_0_36px_rgb(210_251_122/0.6)]"
                      : "border border-line bg-surface-2 text-white hover:border-brand hover:bg-brand/10 hover:text-brand-light"
                  }`}
                >
                  {plan.buttonText}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 0 1 .75-.75h10.64l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <p className="mt-2.5 text-center text-[11px] text-muted">
                  Acesso ao console para instituições clientes
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé explicativo da contratação */}
        <div className="mt-14 rounded-2xl border border-line bg-surface/40 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h4 className="text-base font-semibold text-white">Quer ver funcionando na sua operação?</h4>
              <p className="mt-1 text-sm text-muted">
                Para exchanges, corretoras e bancos de câmbio que prestam serviços de ativos virtuais. Mostramos um saque
                entre duas instituições e dimensionamos o plano pelo volume da sua instituição.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a
                href="#contato"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-brand/50 bg-brand/10 px-5 text-sm font-semibold text-brand-light transition hover:bg-brand hover:text-ink"
              >
                Falar com consultor de vendas
              </a>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-line bg-ink px-5 text-sm font-semibold text-white transition hover:border-white/30"
              >
                Ambiente de Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
