const steps = [
  {
    n: "01",
    title: "Pedido de saque",
    text: "No momento do saque, o cliente declara o destino: outra instituição ou carteira própria. O sistema da instituição chama a Spread pelo conector.",
  },
  {
    n: "02",
    title: "Contraparte conferida",
    text: "A instituição de destino precisa ser autorizada pelo BCB ou ter protocolado o pedido no prazo. Se não for, o saque é bloqueado com o motivo.",
  },
  {
    n: "03",
    title: "Envio cifrado e resposta",
    text: "O conector cifra os dados do remetente e do beneficiário para a chave do destino. O destino confere no próprio cadastro se o cliente existe e se o nome bate, e aceita ou recusa.",
  },
  {
    n: "04",
    title: "Liberação com o aceite",
    text: "Só com o aceite o saque vai para a blockchain. Sem resposta, vai para o compliance. Quando integrado à inteligência da Spread, o risco da carteira entra na mesma decisão.",
  },
];

const safeguards = [
  { title: "Nunca aprovado no silêncio", text: "Sem resposta da contraparte no prazo, o saque vai para o seu compliance." },
  { title: "Você decide", text: "Onde a norma deixa espaço, a regra é definida pelo compliance da instituição." },
  { title: "Contraparte conferida todo dia", text: "A lista oficial do BCB é atualizada todo dia; sem ela, o saque vai para revisão." },
  { title: "Dado pessoal fica com você", text: "A Spread transporta os dados cifrados e guarda só o histórico sem dado pessoal." },
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

/** Seção clara (branco + laranja da marca), em contraste com o restante da página escura. */
export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className="relative bg-paper text-ink">
      <div aria-hidden="true" className="bg-grid-light absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_70%,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-deep">Como funciona</p>
          <h2 id="como-title" className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Do pedido de saque à liberação
          </h2>
          <p className="mt-5 text-lg text-muted-light text-pretty">
            Nada vai para a blockchain antes de a outra ponta aceitar. Cada etapa fica registrada com o motivo, pronta
            para a fiscalização.
          </p>
        </div>

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
              isso cada decisão do Travel Rule vem com o motivo, e as salvaguardas estão no produto.
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
