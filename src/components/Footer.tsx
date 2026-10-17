import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-deep">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <Logo className="size-7" holeColor="#0d1316" />
          <p className="mt-3 text-sm text-muted">Rastreio on-chain de golpes para compliance e risco.</p>
        </div>
        <p className="font-mono text-xs text-muted">© 2026 Spread. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
