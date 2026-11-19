"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Plan {
  id: string;
  name: string;
  badge?: string;
  tagColor: string;
  description: string;
  priceLabel: string;
  priceSub: string;
  isPopular?: boolean;
  buttonText: string;
  buttonHref: string;
  buttonNote: string;
}

const plans: Plan[] = [
  {
    id: "travel-rule",
    name: "Spread Travel Rule",
    badge: "EM OPERAÇÃO",
    tagColor: "border-brand/40 bg-brand/10 text-brand-light",
    description:
      "A troca de informações que o Banco Central exige, com qualquer contraparte, e a trilha pronta para a fiscalização.",
    priceLabel: "Sob consulta",
    priceSub: "Mensalidade · Pelo volume de transferências da instituição",
    isPopular: true,
    buttonText: "Acessar Spread Travel Rule",
    buttonHref: "/login?product=travel-rule",
    buttonNote: "Acesso ao console para instituições clientes",
  },
  {
    id: "motores",
    name: "Spread Motores",
    badge: "PRONTO PARA DIAGNÓSTICO",
    tagColor: "border-neon-lime/40 bg-neon-lime/10 text-neon-lime",
    description:
      "Decide cada saque e cada depósito pelo perfil do cliente: aprova, retém ou bloqueia, com o motivo. Funciona com qualquer Travel Rule.",
    priceLabel: "Sob consulta",
    priceSub: "Mensalidade · Por faixa de decisões por mês",
    buttonText: "Falar sobre os Motores",
    buttonHref: "#contato",
    buttonNote: "Diagnóstico em modo sombra sobre o histórico da instituição",
  },
  {
    id: "antifraude",
    name: "Inteligência Spread · Antifraude",
    badge: "PRONTO PARA DIAGNÓSTICO",
    tagColor: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan",
    description:
      "Sinaliza a carteira que recebeu dinheiro de golpe para a exchange reter o saque antes de o valor sumir.",
    priceLabel: "Sob consulta",
    priceSub: "Módulo opcional · Junto com o Travel Rule ou os Motores",
    buttonText: "Acessar Spread Antifraude",
    buttonHref: "/login?product=antifraude",
    buttonNote: "Em piloto com corretoras parceiras",
  },
  {
    id: "validador",
    name: "Spread Validador",
    badge: "PROTÓTIPO",
    tagColor: "border-white/20 bg-white/5 text-white/80",
    description:
      "Prova que a carteira autocustodiada é mesmo do cliente, com a assinatura da própria carteira, sem mover fundos.",
    priceLabel: "Sob consulta",
    priceSub: "Módulo opcional · Junto com o Travel Rule",
    buttonText: "Falar sobre o Validador",
    buttonHref: "#contato",
    buttonNote: "Em protótipo: conversamos sobre o piloto",
  },
];

const INTERVAL_MS = 6000;

/** Quantos cards cabem lado a lado: 1 até 1024 px, 2 acima. */
function usePerView() {
  const [perView, setPerView] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setPerView(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return perView;
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`size-4 ${dir === "left" ? "rotate-180" : ""}`} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.64l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 sm:p-10 ${
        plan.isPopular
          ? "border-brand/70 bg-gradient-to-b from-surface/90 via-surface to-ink shadow-[0_0_50px_-12px_rgb(242_106_27/0.35)]"
          : "border-line bg-surface/60 hover:border-white/20 hover:bg-surface/90"
      }`}
    >
      {/* sem selo, o espaço fica para os títulos dos cards lado a lado continuarem alinhados */}
      {plan.badge ? (
        <span
          className={`mb-5 inline-flex w-fit items-center rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider ${plan.tagColor}`}
        >
          {plan.badge}
        </span>
      ) : (
        <span aria-hidden="true" className="mb-5 block h-[26px]" />
      )}

      <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{plan.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">{plan.description}</p>

      <div className="mt-8 rounded-2xl border border-line bg-ink/70 p-5">
        <span className="font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{plan.priceLabel}</span>
        <p className="mt-1.5 text-xs text-muted">{plan.priceSub}</p>
      </div>

      <div className="mt-8">
        <Link
          href={plan.buttonHref}
          className={`inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all duration-200 ${
            plan.isPopular
              ? "bg-neon-lime text-ink shadow-[0_0_24px_rgb(210_251_122/0.4)] hover:bg-[#bbf451] hover:shadow-[0_0_36px_rgb(210_251_122/0.6)]"
              : "border border-line bg-surface-2 text-white hover:border-brand hover:bg-brand/10 hover:text-brand-light"
          }`}
        >
          {plan.buttonText}
          <Arrow dir="right" />
        </Link>
        <p className="mt-2.5 text-center text-[11px] text-muted">{plan.buttonNote}</p>
      </div>
    </div>
  );
}

export function Pricing() {
  const perView = usePerView();
  const maxIndex = plans.length - perView;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = Math.min(index, maxIndex);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;
    const t = window.setTimeout(() => setIndex((i) => (Math.min(i, maxIndex) + 1) % (maxIndex + 1)), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [current, paused, maxIndex]);

  const go = (i: number) => setIndex((i + maxIndex + 1) % (maxIndex + 1));

  return (
    <section id="planos" className="relative isolate overflow-hidden border-t border-line bg-ink pt-24 pb-10 sm:pt-32 sm:pb-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/2 size-96 -translate-y-1/2 rounded-full bg-brand opacity-10 blur-[130px]" />
        <div className="absolute right-1/4 top-1/3 size-96 -translate-y-1/2 rounded-full bg-neon-lime opacity-10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 font-mono text-xs tracking-wide text-brand-light">
            <span className="live-dot size-1.5 rounded-full bg-brand" aria-hidden="true" />
            PLANOS INSTITUCIONAIS
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Comece pela peça que você precisa hoje
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Cada produto é contratado sozinho ou junto com os outros. O preço é dimensionado pelo volume da sua
            instituição.
          </p>
        </div>

        <div
          className="mt-14"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Produtos da Spread"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="-mx-3 overflow-hidden pt-5">
            <ul
              className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${(current * 100) / perView}%)` }}
            >
              {plans.map((plan, i) => {
                const visible = i >= current && i < current + perView;
                return (
                  <li
                    key={plan.id}
                    className="shrink-0 basis-full px-3 lg:basis-1/2"
                    aria-hidden={!visible}
                    inert={!visible}
                  >
                    <PlanCard plan={plan} />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(current - 1)}
              aria-label="Produto anterior"
              className="grid size-10 place-items-center rounded-full border border-line bg-surface/70 text-white transition hover:border-brand hover:text-brand-light"
            >
              <Arrow dir="left" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir para ${plans[i].name}`}
                  aria-current={i === current}
                  className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-brand" : "w-1.5 bg-white/25 hover:bg-white/50"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(current + 1)}
              aria-label="Próximo produto"
              className="grid size-10 place-items-center rounded-full border border-line bg-surface/70 text-white transition hover:border-brand hover:text-brand-light"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-line bg-surface/40 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h4 className="text-base font-semibold text-white">Quer ver funcionando na sua operação?</h4>
              <p className="mt-1 text-sm text-muted">
                Para exchanges, corretoras e bancos que prestam serviços de ativos virtuais. Mostramos um saque entre
                duas instituições e dimensionamos o plano pelo volume da sua instituição.
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
