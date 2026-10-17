import type { ReactNode } from "react";

type Chain = { name: string; standard: string; icon: ReactNode };

const iconProps = {
  viewBox: "0 0 32 32",
  className: "size-7 shrink-0",
  "aria-hidden": true,
  focusable: false,
} as const;

const chains: Chain[] = [
  {
    name: "Ethereum",
    standard: "EVM / ERC-20",
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M16 3.5 8.5 16 16 20.5 23.5 16z" />
        <path d="M8.5 17.5 16 28.5l7.5-11" />
        <path d="M8.5 16 16 12.5 23.5 16" />
      </svg>
    ),
  },
  {
    name: "Bitcoin",
    standard: "UTXO / Taproot",
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 8h10a4 4 0 0 1 0 8H8z" />
        <path d="M8 16h11a4.5 4.5 0 0 1 0 9H8z" />
        <path d="M11 5v3m0 17v3m6-23v3m0 17v3" />
      </svg>
    ),
  },
  {
    name: "Polygon",
    standard: "PoS / zkEVM",
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="m11.5 12-5.5 3.2v6.4l5.5 3.2 5.5-3.2v-6.4z" />
        <path d="m20.5 7.2-5.5 3.2v6.4l5.5 3.2 5.5-3.2V10.4z" />
      </svg>
    ),
  },
  {
    name: "Solana",
    standard: "SVM / Token-2022",
    icon: (
      <svg {...iconProps} fill="currentColor">
        <path d="M8 8.5h18l-3 3.5H5zM5 14.25h18l3 3.5H8zM8 20h18l-3 3.5H5z" />
      </svg>
    ),
  },
  {
    name: "Arbitrum",
    standard: "Rollup Nitro",
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M16 4.5 27.5 16 16 27.5 4.5 16z" />
        <path d="m10 19 6-8 6 8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Avalanche",
    standard: "Subnets / C-Chain",
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <path d="m16 9 6.5 12h-13z" />
      </svg>
    ),
  },
];

/** Barra de Confiança (Social Proof) - Passo 2.2 */
export function TrustBar() {
  return (
    <section aria-labelledby="trust-title" className="border-y border-line bg-ink-deep/60">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <h2 id="trust-title" className="text-center font-mono text-xs uppercase tracking-[0.16em] text-muted">
          Monitorando ativos em mais de <span className="text-white font-semibold">65 blockchains</span>
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
          {chains.map((chain) => (
            <li
              key={chain.name}
              className="flex items-center justify-center gap-3 text-white opacity-55 grayscale transition-opacity duration-300 hover:opacity-100"
            >
              {chain.icon}
              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-tight">{chain.name}</span>
                <span className="block font-mono text-[10.5px] text-muted">{chain.standard}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
