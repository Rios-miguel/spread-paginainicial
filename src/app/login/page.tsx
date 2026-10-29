"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";

type ProductType = "antifraude" | "travel-rule";

function LoginFormContent() {
  const searchParams = useSearchParams();
  // a aba vem do ?product= da URL até a pessoa trocar; sem ele, Travel Rule (o produto no ar)
  const [chosen, setActiveTab] = useState<ProductType | null>(null);
  const activeTab: ProductType = chosen ?? (searchParams.get("product") === "antifraude" ? "antifraude" : "travel-rule");

  return (
    <div className="relative min-h-screen bg-ink text-white flex flex-col justify-between overflow-hidden">
      {/* Luzes ambiente */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute left-1/3 top-1/4 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-15 blur-[140px]" />
        <div className="absolute right-1/4 top-1/2 size-[28rem] -translate-y-1/2 rounded-full bg-neon-lime opacity-10 blur-[130px]" />
      </div>

      {/* Barra de Navegação Superior */}
      <header className="border-b border-line bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-muted">
              <span className="size-2 rounded-full bg-ok animate-pulse" />
              <span>CONEXÃO SEGURA</span>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted transition hover:border-brand hover:text-white"
            >
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal / Card de Login */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-xl">
          {/* Card com abas */}
          <div className="relative rounded-3xl border border-line bg-surface/90 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {/* Header do Card */}
            <div className="text-center pb-6 border-b border-line">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-light">
                Autenticação Segura Spread
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Console Institucional
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-muted">
                Selecione o produto contratado para acessar seu ambiente dedicado
              </p>
            </div>

            {/* Seletor de Abas dos Produtos */}
            <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-line bg-ink/80 p-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("antifraude");
                }}
                className={`flex flex-col items-center justify-center rounded-xl py-3 px-3 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === "antifraude"
                    ? "border border-neon-cyan/40 bg-surface-2 text-white shadow-[0_0_20px_-3px_rgb(0_255_255/0.25)]"
                    : "text-muted hover:text-white hover:bg-surface/50"
                }`}
              >
                <span className="flex items-center gap-1.5 font-bold">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 text-neon-cyan" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Spread Antifraude
                </span>
                <span className="font-mono text-[10px] text-muted">Motor On-Chain</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("travel-rule");
                }}
                className={`flex flex-col items-center justify-center rounded-xl py-3 px-3 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === "travel-rule"
                    ? "border border-brand/50 bg-surface-2 text-white shadow-[0_0_20px_-3px_rgb(242_106_27/0.3)]"
                    : "text-muted hover:text-white hover:bg-surface/50"
                }`}
              >
                <span className="flex items-center gap-1.5 font-bold">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 text-brand-light" aria-hidden="true">
                    <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 4.343a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0ZM6.464 13.536a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM4.25 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4.25 10ZM14.596 14.596a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 1 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061ZM5.404 5.404a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061Z" />
                  </svg>
                  Spread Travel Rule
                </span>
                <span className="font-mono text-[10px] text-brand-light">BCB 520 / 589</span>
              </button>
            </div>

            {/* Descrição do Produto Selecionado */}
            <div className="mt-5 rounded-xl border border-line bg-ink/50 p-4">
              {activeTab === "antifraude" ? (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-2 rounded-full bg-neon-cyan shrink-0 animate-pulse" />
                  <p className="text-xs text-muted leading-relaxed">
                    <strong className="text-white">Spread Antifraude:</strong> aviso quando dinheiro de golpe chega a
                    uma conta de depósito, com score proporcional, para a exchange reter o saque. Módulo em desenvolvimento.
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-2 rounded-full bg-brand shrink-0 animate-pulse" />
                  <p className="text-xs text-muted leading-relaxed">
                    <strong className="text-white">Spread Travel Rule:</strong> troca cifrada dos dados de remetente e
                    beneficiário, checagem da contraparte na lista oficial do BCB, fila do Coaf e console de compliance.
                  </p>
                </div>
              )}
            </div>

            {/* Acesso: o Travel Rule abre o console, onde a instituição entra com a chave de acesso dela; o antifraude
                ainda está em piloto com corretoras parceiras */}
            {activeTab === "travel-rule" ? (
              <div className="mt-6">
                <a
                  href="/travelrule"
                  className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-neon-lime text-sm font-semibold text-ink shadow-[0_0_24px_rgb(210_251_122/0.4)] transition-all duration-200 hover:bg-[#bbf451]"
                >
                  Entrar no Spread Travel Rule →
                </a>
                <p className="mt-3 text-center text-[11px] text-muted">
                  No console, use a chave de acesso que a Spread entregou à sua instituição.
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <div className="rounded-xl border border-neon-cyan/30 bg-neon-cyan/5 p-4 text-xs leading-relaxed text-muted">
                  <strong className="text-white">Em piloto com corretoras parceiras.</strong> O acesso ao Antifraude é
                  liberado para as instituições participantes do piloto.
                </div>
                <Link
                  href="/#contato"
                  className="mt-4 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-ink shadow-[0_0_24px_rgb(242_106_27/0.4)] transition-all duration-200 hover:bg-brand-light"
                >
                  Quero participar do piloto →
                </Link>
              </div>
            )}

            {/* Rodapé do Card */}
            <div className="mt-8 pt-6 border-t border-line text-center">
              <p className="text-xs text-muted">
                A chave de acesso é criada pela Spread no início do contrato e entregue por canal seguro.
              </p>
              <Link
                href="/#planos"
                className="mt-1.5 inline-block text-xs font-semibold text-brand-light hover:underline"
              >
                Ver os planos da Spread →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé da Página */}
      <footer className="border-t border-line bg-ink-deep py-6 text-center text-xs text-muted">
        <div className="mx-auto max-w-7xl px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Spread. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Res. BCB 520/2025</span>
            <span>·</span>
            <span>Dados cifrados de ponta a ponta</span>
            <span>·</span>
            <span>LGPD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ink flex items-center justify-center text-muted font-mono text-sm">
          Carregando...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
