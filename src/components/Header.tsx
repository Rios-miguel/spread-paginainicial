import Link from "next/link";
import { Logo } from "./Logo";

const nav = [
  { href: "#solucao", label: "Solução" },
  { href: "#produto", label: "Produto" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a href="#topo" className="justify-self-start rounded-md" aria-label="Spread, voltar ao topo">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-10 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
          {/* Botão de Login direto */}
          <Link
            href="/login"
            className="hidden sm:inline-flex h-10 items-center rounded-full border border-line bg-surface/80 px-4 text-sm font-medium text-white transition hover:border-white/30 hover:bg-surface-2"
          >
            Entrar
          </Link>

          {/* CTA principal */}
          <a
            href="#contato"
            className="inline-flex h-9 items-center rounded-full bg-brand px-4 text-xs font-semibold text-ink transition hover:bg-brand-light hover:shadow-[0_0_28px_rgb(242_106_27/0.45)] sm:h-10 sm:px-5 sm:text-sm"
          >
            Agendar demo
          </a>
        </div>
      </div>
    </header>
  );
}
