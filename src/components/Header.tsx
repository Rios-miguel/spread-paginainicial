import { Logo } from "./Logo";

const nav = [
  { href: "#solucao", label: "Solução" },
  { href: "#produto", label: "Produto" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#topo" className="rounded-md" aria-label="Spread, voltar ao topo">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contato"
          className="inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-ink transition hover:bg-brand-light hover:shadow-[0_0_28px_rgb(242_106_27/0.45)]"
        >
          Agendar demo
        </a>
      </div>
    </header>
  );
}
