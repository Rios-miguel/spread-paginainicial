import { LeadForm } from "./LeadForm";

const audiences = [
  { title: "Exchanges e PSAVs", text: "Travel Rule para a Res. BCB 520 e aviso de dinheiro de golpe no depósito." },
  { title: "Corretoras e bancos de câmbio", text: "Travel Rule para as operações com ativos virtuais (Res. BCB 521)." },
  { title: "Bancos e fintechs", text: "Acompanhe o dinheiro do seu cliente depois que ele vira cripto." },
];

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/4 size-[30rem] rounded-full bg-brand opacity-20 blur-[120px]" />
        <div className="absolute right-0 bottom-0 size-[22rem] rounded-full bg-brand-glow opacity-10 blur-[120px]" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="reveal">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">Fale com a gente</p>
          <h2 id="contato-title" className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            O golpe deixa rastro. <span className="text-gradient">A gente segue.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-muted text-pretty">
            Em 30 minutos mostramos um saque com Travel Rule entre duas instituições, da cifragem dos dados à decisão do
            compliance, e um golpe real seguido até a exchange.
          </p>
          <ul className="mt-10 space-y-5">
            {audiences.map((a) => (
              <li key={a.title} className="flex gap-4">
                <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>
                  <span className="block font-semibold">{a.title}</span>
                  <span className="text-muted">{a.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
