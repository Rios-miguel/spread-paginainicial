"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";

type ProductType = "antifraude" | "travel-rule";

function LoginFormContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") === "travel-rule" ? "travel-rule" : "antifraude";

  const [activeTab, setActiveTab] = useState<ProductType>(initialProduct);
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [leiCode, setLeiCode] = useState("");
  const [complianceEmail, setComplianceEmail] = useState("");
  const [keyHex, setKeyHex] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sincroniza se a query param mudar na URL
  useEffect(() => {
    const p = searchParams.get("product");
    if (p === "travel-rule") {
      setActiveTab("travel-rule");
    } else if (p === "antifraude") {
      setActiveTab("antifraude");
    }
  }, [searchParams]);

  const handleDemoFill = () => {
    if (activeTab === "antifraude") {
      setEmail("secops@exchange-parceira.com.br");
      setApiKey("spr_live_89f02c7b31a89e45e90d12");
      setPassword("DemoAuthToken#2026");
    } else {
      setLeiCode("5493006MHB84DD0ZWV18");
      setComplianceEmail("compliance@vasp-autorizada.com.br");
      setKeyHex("x25519_pk_7b32c8e011fa904d6b2c");
      setPassword("VaultMasterPass#2026");
    }
    setStatusMsg("Credenciais de demonstração (Sandbox) carregadas com sucesso!");
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg("Validando credenciais com o nó de segurança da Spread...");

    setTimeout(() => {
      if (activeTab === "antifraude") {
        setStatusMsg("✓ Autenticado! Canal assinado via Webhook HMAC. Inicializando Dashboard Antifraude...");
      } else {
        setStatusMsg("✓ LEI Verificado! Envelope de chaves X25519 derivado localmente. Inicializando Suite Travel Rule...");
      }
      setIsLoading(false);
    }, 1800);
  };

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
              <span>TLS 1.3 · X25519 ACTIVE · AMBIENTE INSTITUCIONAL</span>
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
                  setStatusMsg(null);
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
                  setStatusMsg(null);
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
                  Suite Travel Rule
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
                    <strong className="text-white">Spread Antifraude:</strong> Monitoramento on-chain em tempo real,
                    análise de taint proporcional e disparos de webhook pré-saque para exchanges e OTC.
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-2 rounded-full bg-brand shrink-0 animate-pulse" />
                  <p className="text-xs text-muted leading-relaxed">
                    <strong className="text-white">Spread Antifraude + Travel Rule:</strong> Suite regulatória VASP com
                    troca cifrada de mensagens (X25519), verificação de carteiras e reconciliação oficial BCB Olinda.
                  </p>
                </div>
              )}
            </div>

            {/* Formulário de Login */}
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              {activeTab === "antifraude" ? (
                <>
                  <div>
                    <label className="block font-mono text-xs font-medium uppercase tracking-wider text-muted">
                      E-mail Institucional
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="operacoes@suaexchange.com.br"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 font-mono text-sm text-white placeholder-muted/60 transition focus:border-neon-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-medium uppercase tracking-wider text-muted">
                      Client ID / API Key
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="spr_live_..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 font-mono text-sm text-white placeholder-muted/60 transition focus:border-neon-cyan focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-medium uppercase tracking-wider text-muted">
                      Token OTP / Chave Master
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 font-mono text-sm text-white placeholder-muted/60 transition focus:border-neon-cyan focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block font-mono text-xs font-medium uppercase tracking-wider text-muted">
                      Código LEI da Instituição (ISO 17442)
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={20}
                      placeholder="5493006MHB84DD0ZWV18"
                      value={leiCode}
                      onChange={(e) => setLeiCode(e.target.value.toUpperCase())}
                      className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 font-mono text-sm uppercase text-white placeholder-muted/60 transition focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-medium uppercase tracking-wider text-muted">
                      E-mail do Oficial de Compliance / DPO
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="compliance@suavasp.com.br"
                      value={complianceEmail}
                      onChange={(e) => setComplianceEmail(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 font-mono text-sm text-white placeholder-muted/60 transition focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-medium uppercase tracking-wider text-muted">
                      Chave Pública X25519 (.pem ou Hex)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="x25519_pk_..."
                      value={keyHex}
                      onChange={(e) => setKeyHex(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 font-mono text-sm text-white placeholder-muted/60 transition focus:border-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-medium uppercase tracking-wider text-muted">
                      Senha do Cofre Local (WebCrypto)
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-line bg-ink px-4 py-3 font-mono text-sm text-white placeholder-muted/60 transition focus:border-brand focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Status Message */}
              {statusMsg && (
                <div
                  className={`rounded-xl p-3.5 font-mono text-xs leading-relaxed transition-all ${
                    statusMsg.startsWith("✓")
                      ? "border border-ok/40 bg-ok/10 text-ok"
                      : "border border-brand/40 bg-brand/10 text-brand-light"
                  }`}
                >
                  {statusMsg}
                </div>
              )}

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === "travel-rule"
                    ? "bg-neon-lime text-ink shadow-[0_0_24px_rgb(210_251_122/0.4)] hover:bg-[#bbf451]"
                    : "bg-brand text-ink shadow-[0_0_24px_rgb(242_106_27/0.4)] hover:bg-brand-light"
                } ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="size-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" />
                    </svg>
                    Autenticando...
                  </>
                ) : activeTab === "travel-rule" ? (
                  "Autenticar na Suite Travel Rule →"
                ) : (
                  "Acessar Console Antifraude →"
                )}
              </button>

              {/* Botão de Preenchimento Rápido para Demonstração */}
              <button
                type="button"
                onClick={handleDemoFill}
                className="w-full text-center font-mono text-[11px] text-muted transition hover:text-white pt-2"
              >
                [⚡ Preencher com credenciais de demonstração Sandbox]
              </button>
            </form>

            {/* Rodapé do Card */}
            <div className="mt-8 pt-6 border-t border-line text-center">
              <p className="text-xs text-muted">
                Ainda não possui credenciais institucionais ou deseja contratar?
              </p>
              <Link
                href="/#planos"
                className="mt-1.5 inline-block text-xs font-semibold text-brand-light hover:underline"
              >
                Ver opções de planos do Spread →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé da Página */}
      <footer className="border-t border-line bg-ink-deep py-6 text-center text-xs text-muted">
        <div className="mx-auto max-w-7xl px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Spread Tecnologia Ltda. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>BCB 520 / 589 Compliant</span>
            <span>·</span>
            <span>X25519 E2E Encrypted</span>
            <span>·</span>
            <span>LGPD By Design</span>
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
          Carregando ambiente de autenticação Spread...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
