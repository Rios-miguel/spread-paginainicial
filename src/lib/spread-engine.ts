export interface CaseData {
  id: string;
  chain: "ethereum" | "bitcoin";
  name: string;
  currency: string;
  origin: string;
  originLabel: string;
  openedAt: string;
  lastMove: string;
  lastMoveAgo: string;
  amountUsd: number;
  amountFormatted: string;
  split: {
    parkedUsd: number;
    parkedFormatted: string;
    parkedDetail: string;
    inExchangeUsd: number;
    inExchangeFormatted: string;
    endedUsd: number;
    endedFormatted: string;
    endedDetail?: string;
    unexplainedFormatted?: string;
    restUsd: number;
    restFormatted: string;
    restDetail: string;
  };
  metrics: {
    walletsCount: number;
    flaggedCount: number;
    layersCount: number;
  };
  parkedWallets: {
    address: string;
    tag: string;
    type: "frozen" | "parado" | "partial";
    amountFormatted: string;
    detail: string;
    timeAgo: string;
    percentWidth: number;
    color: string;
  }[];
  recentMoves: {
    from: string;
    to: string;
    amountFormatted: string;
    time: string;
    timeAgo: string;
    token: string;
    tokenColor: string;
  }[];
}

export const ETHEREUM_CASE: CaseData = {
  id: "case-eth-binance-2026",
  chain: "ethereum",
  name: "Ethereum · Exploit Binance",
  currency: "em USDT",
  origin: "0x5227c81a287f4c9a59b2f8c871409210928a2f8c",
  originLabel: "0x5227…2f8c",
  openedAt: "30/10/2026, 10:31 UTC - 3",
  lastMove: "30/10/2026, 04:01 UTC - 3",
  lastMoveAgo: "há 9 h",
  amountUsd: 3635335878.85,
  amountFormatted: "US$ 3.635.335.878,85",
  split: {
    parkedUsd: 3544823766.26,
    parkedFormatted: "US$ 3.544.823.766,26",
    parkedDetail: "US$ 1,7 bi em USDT · US$ 1,1 bi em ETH · US$ 605,2 mi…",
    inExchangeUsd: 0,
    inExchangeFormatted: "US$ 0,00",
    endedUsd: 24407252.79,
    endedFormatted: "US$ 24.407.252,79",
    endedDetail: "US$ 9,2 mi em USDT · US$ 3,7 mi em UNI · US$ 3 mi…",
    unexplainedFormatted: "US$ 24.407.242,79 sem explicação",
    restUsd: 66104859.8,
    restFormatted: "US$ 66.104.859,80",
    restDetail: "Taxas e queimas residuais",
  },
  metrics: {
    walletsCount: 109,
    flaggedCount: 33,
    layersCount: 6,
  },
  parkedWallets: [
    {
      address: "0x52…2f8c",
      tag: "origem - congelada",
      type: "frozen",
      amountFormatted: "US$ 2,1 bi",
      detail: "US$ 1,5 bi em USDT · US$ 606,1 mi em ETH",
      timeAgo: "há 9 h",
      percentWidth: 65,
      color: "#00ffff",
    },
    {
      address: "0x85…43D4",
      tag: "camada 1",
      type: "parado",
      amountFormatted: "US$ 438,4 mi",
      detail: "em ETH",
      timeAgo: "há 15 h",
      percentWidth: 35,
      color: "#F26A1B",
    },
    {
      address: "0xc8…206A",
      tag: "camada 2",
      type: "parado",
      amountFormatted: "US$ 304,1 mi",
      detail: "em ETH",
      timeAgo: "há 15 h",
      percentWidth: 25,
      color: "#F26A1B",
    },
  ],
  recentMoves: [
    {
      from: "0x7f…15F3",
      to: "0x52…2f8c",
      amountFormatted: "US$ 1,4 mil",
      time: "30/10/2026, 04:01 UTC - 3",
      timeAgo: "há 9 h",
      token: "● ETH",
      tokenColor: "text-purple-400",
    },
    {
      from: "0xdD…2296",
      to: "0x52…2f8c",
      amountFormatted: "US$ 5 mi",
      time: "30/10/2026, 03:55 UTC - 3",
      timeAgo: "há 9 h",
      token: "● várias moedas",
      tokenColor: "text-slate-400",
    },
    {
      from: "0xdD…2296",
      to: "UniswapV2Pair",
      amountFormatted: "US$ 17,6 mil",
      time: "30/10/2026, 03:45 UTC - 3",
      timeAgo: "há 10 h",
      token: "● PROM - troca",
      tokenColor: "text-blue-400",
    },
    {
      from: "0x06…685f",
      to: "0x52…2f8c",
      amountFormatted: "US$ 5,1 mi",
      time: "30/10/2026, 03:30 UTC - 3",
      timeAgo: "há 10 h",
      token: "● FUN",
      tokenColor: "text-purple-400",
    },
    {
      from: "0x06…685f",
      to: "0x79…544A",
      amountFormatted: "US$ 251,6 mil",
      time: "30/10/2026, 02:35 UTC - 3",
      timeAgo: "há 11 h",
      token: "● ETH",
      tokenColor: "text-purple-400",
    },
    {
      from: "0xB3…5Fdb",
      to: "0x79…544A",
      amountFormatted: "US$ 19,9 mi",
      time: "30/10/2026, 02:10 UTC - 3",
      timeAgo: "há 11 h",
      token: "● ETH",
      tokenColor: "text-purple-400",
    },
  ],
};

export const BITCOIN_CASE: CaseData = {
  id: "case-btc-binance-2026",
  chain: "bitcoin",
  name: "Bitcoin · Exploit Binance",
  currency: "em ativo não identificado",
  origin: "bc1q0mtc7784019283726485930219283742mnm",
  originLabel: "bc1q…2mnm",
  openedAt: "30/10/2026, 09:55 UTC - 3",
  lastMove: "29/10/2026, 17:48 UTC - 3",
  lastMoveAgo: "há 20 h",
  amountUsd: 1484900070.48,
  amountFormatted: "US$ 1.484.900.070,48",
  split: {
    parkedUsd: 1412783687.35,
    parkedFormatted: "US$ 1.412.783.687,35",
    parkedDetail: "US$ 1,4 bi em BTC · US$ 1 mil em outros",
    inExchangeUsd: 0,
    inExchangeFormatted: "US$ 0,00",
    endedUsd: 0,
    endedFormatted: "US$ 0,00",
    restUsd: 72116383.13,
    restFormatted: "US$ 72.116.383,13",
    restDetail: "Taxas de mineradores e UTXOs de poeira",
  },
  metrics: {
    walletsCount: 30,
    flaggedCount: 30,
    layersCount: 4,
  },
  parkedWallets: [
    {
      address: "bc1q…mfv3",
      tag: "camada 1",
      type: "parado",
      amountFormatted: "US$ 77,3 mi",
      detail: "em BTC",
      timeAgo: "há 20 h",
      percentWidth: 70,
      color: "#F26A1B",
    },
    {
      address: "bc1q…znn6",
      tag: "camada 2",
      type: "parado",
      amountFormatted: "US$ 77,3 mi",
      detail: "em BTC",
      timeAgo: "há 20 h",
      percentWidth: 70,
      color: "#F26A1B",
    },
    {
      address: "bc1q…1syx",
      tag: "camada 3",
      type: "parado",
      amountFormatted: "US$ 77,3 mi",
      detail: "em BTC",
      timeAgo: "há 20 h",
      percentWidth: 70,
      color: "#F26A1B",
    },
    {
      address: "bc1q…wjxp",
      tag: "camada 4",
      type: "parado",
      amountFormatted: "US$ 77,3 mi",
      detail: "em BTC",
      timeAgo: "há 20 h",
      percentWidth: 70,
      color: "#F26A1B",
    },
    {
      address: "bc1q…tcx8",
      tag: "camada 2",
      type: "parado",
      amountFormatted: "US$ 77,3 mi",
      detail: "em BTC",
      timeAgo: "há 20 h",
      percentWidth: 70,
      color: "#F26A1B",
    },
    {
      address: "bc1q…89gw",
      tag: "camada 2",
      type: "parado",
      amountFormatted: "US$ 77,3 mi",
      detail: "em BTC",
      timeAgo: "há 20 h",
      percentWidth: 70,
      color: "#F26A1B",
    },
    {
      address: "bc1q…41xg",
      tag: "camada 2",
      type: "parado",
      amountFormatted: "US$ 77,3 mi",
      detail: "em BTC",
      timeAgo: "há 20 h",
      percentWidth: 70,
      color: "#F26A1B",
    },
  ],
  recentMoves: [
    {
      from: "bc1q…2mnm",
      to: "bc1q…s9ra",
      amountFormatted: "US$ 35,6 mi",
      time: "29/10/2026, 17:48 UTC - 3",
      timeAgo: "há 20 h",
      token: "● BTC",
      tokenColor: "text-amber-500",
    },
    {
      from: "bc1q…2mnm",
      to: "bc1q…mfv3",
      amountFormatted: "US$ 81,3 mi",
      time: "29/10/2026, 17:20 UTC - 3",
      timeAgo: "há 20 h",
      token: "● BTC",
      tokenColor: "text-amber-500",
    },
    {
      from: "bc1q…2mnm",
      to: "bc1q…ga6u",
      amountFormatted: "US$ 33,3 mi",
      time: "29/10/2026, 17:20 UTC - 3",
      timeAgo: "há 20 h",
      token: "● BTC",
      tokenColor: "text-amber-500",
    },
    {
      from: "bc1q…2mnm",
      to: "bc1q…z2jc",
      amountFormatted: "US$ 300,4 mi",
      time: "29/10/2026, 17:20 UTC - 3",
      timeAgo: "há 20 h",
      token: "● BTC",
      tokenColor: "text-amber-500",
    },
    {
      from: "bc1q…2mnm",
      to: "bc1q…nz7w",
      amountFormatted: "US$ 81,3 mi",
      time: "29/10/2026, 17:20 UTC - 3",
      timeAgo: "há 20 h",
      token: "● BTC",
      tokenColor: "text-amber-500",
    },
    {
      from: "bc1q…2mnm",
      to: "bc1q…7l02",
      amountFormatted: "US$ 158,2 mi",
      time: "29/10/2026, 17:20 UTC - 3",
      timeAgo: "há 20 h",
      token: "● BTC",
      tokenColor: "text-amber-500",
    },
  ],
};
