import { HeroFacts } from "./HeroFacts";
import { InteractiveNetworkGraph } from "./InteractiveNetworkGraph";

export function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* Fundo: grade de terminal + luzes neon (Ciano, Verde Lima e Laranja) misturadas no centro da tela */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 size-[30rem] -translate-x-[75%] -translate-y-1/2 rounded-full bg-neon-cyan opacity-20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 size-[28rem] -translate-x-[20%] -translate-y-1/3 rounded-full bg-neon-lime opacity-20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/4 size-[34rem] -translate-x-1/2 rounded-full bg-brand opacity-20 blur-[120px]" />
      </div>

      {/* Malha interativa de grafos (laranja e branco) reativa ao mouse */}
      <InteractiveNetworkGraph />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 font-mono text-xs tracking-wide text-brand-light">
          <span className="live-dot size-1.5 rounded-full bg-brand" aria-hidden="true" />
          O golpe deixa rastro. A gente segue.
        </p>

        <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Compliance e inteligência para <span className="text-gradient">quem opera ativos virtuais</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
          A Spread é uma empresa brasileira de tecnologia para compliance em criptoativos. Entregamos um ecossistema
          completo: uma inteligência que acompanha o dinheiro em todas as fases do fluxo financeiro e sinaliza a fraude
          para <strong className="font-medium text-white">proteger a sua instituição</strong>.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#planos"
            className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-neon-lime px-8 text-base font-semibold text-ink shadow-[0_0_0_1px_rgb(210_251_122/0.4),0_10px_40px_-8px_rgb(210_251_122/0.5)] transition hover:bg-[#bbf451] hover:shadow-[0_0_48px_rgb(210_251_122/0.65)] sm:w-auto"
          >
            Ver planos da Spread
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.64l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="#contato"
            className="inline-flex h-13 w-full items-center justify-center rounded-full border border-white/25 px-8 text-base font-semibold text-white transition hover:border-brand hover:text-brand-light sm:w-auto"
          >
            Agendar uma Demo
          </a>
        </div>

        <HeroFacts />
      </div>
    </section>
  );
}
