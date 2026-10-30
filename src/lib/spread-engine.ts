export interface CaseAlert {
  id: string;
  target: string;
  exchange: string;
  amountFormatted: string;
  riskScore: string;
  action: "RETER" | "ALERTAR";
  status: string;
  time: string;
}

export interface AlertPoint {
  id: string;
  name: string;
  type: "pool" | "bridge" | "mixer" | "exchange" | "service";
  amountFormatted: string;
  detail: string;
}

export interface MixerReview {
  id: string;
  mixer: string;
  target: string;
  amountFormatted: string;
  signals: string[];
  status: "Pendente de revisão" | "Vinculado";
}

export interface ChannelMessage {
  id: string;
  sender: string;
  senderRole: "bank" | "exchange" | "system";
  timestamp: string;
  subject: string;
  content: string;
  encrypted: boolean;
  ivms101Payload?: {
    originator: string;
    beneficiary: string;
    accountNumber: string;
    nationalId: string;
    actionTaken: string;
  };
}

export interface CaseData {
  id: string;
  chain: "ethereum" | "bitcoin" | "tron" | "polygon";
  name: string;
  isLive: boolean;
  category: "live" | "historical";
  historicalDuration?: string;
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
    visualCriticalNodesCount?: number;
  };
  antiPollutionInfo?: {
    mode: string;
    description: string;
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
  alerts: {
    withdrawals: CaseAlert[];
    alertPoints: AlertPoint[];
    mixerReviews: MixerReview[];
  };
  channelMessages: ChannelMessage[];
  freezeReportMarkdown: string;
}

// 1. CASO AO VIVO: ETHEREUM EXPLOIT BINANCE
export const ETHEREUM_CASE: CaseData = {
  id: "binance-eth",
  chain: "ethereum",
  name: "Ethereum · Exploit Binance",
  isLive: true,
  category: "live",
  currency: "em USDT e tokens",
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
    visualCriticalNodesCount: 33,
  },
  antiPollutionInfo: {
    mode: "Rastreamento Contínuo de Rota Crítica (6 Camadas)",
    description: "O grafo exibe os 33 nós prioritários e rotas ativas do exploit de US$ 3,63 bi (pontes Across, pools Tornado Cash, depósitos retidos e carteiras de retenção Tether). Todas as 109 carteiras ativas do rastro completo estão exportadas no arquivo CSV.",
  },
  parkedWallets: [
    {
      address: "0x52…2f8c",
      tag: "origem - congelada (Tether blacklist)",
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
      token: "● PROM - troca DEX",
      tokenColor: "text-blue-400",
    },
  ],
  alerts: {
    withdrawals: [
      {
        id: "WTH-01",
        target: "0x39aB…91cD",
        exchange: "Binance Hot Deposit",
        amountFormatted: "US$ 1.850.000,00",
        riskScore: "98,4%",
        action: "RETER",
        status: "Webhook enviado · Depósito retido pela exchange",
        time: "há 45 min",
      },
      {
        id: "WTH-02",
        target: "0x71eF…02aA",
        exchange: "OKX OTC Desk",
        amountFormatted: "US$ 420.000,00",
        riskScore: "74,2%",
        action: "RETER",
        status: "Depósito bloqueado automaticamente via API",
        time: "há 2 h",
      },
      {
        id: "WTH-03",
        target: "0x98bC…44f1",
        exchange: "KuCoin Deposit Account",
        amountFormatted: "US$ 85.000,00",
        riskScore: "28,6%",
        action: "ALERTAR",
        status: "Em análise pelo compliance da exchange",
        time: "há 3 h",
      },
    ],
    alertPoints: [
      {
        id: "PT-01",
        name: "Tornado Cash Router (0x7C06…5CA0)",
        type: "mixer",
        amountFormatted: "US$ 240.000.000,00",
        detail: "Abastecimento inicial do invasor via pool 100 ETH",
      },
      {
        id: "PT-02",
        name: "Across Protocol SpokePool",
        type: "bridge",
        amountFormatted: "US$ 18.450.000,00",
        detail: "Travessia declarada de Ethereum para Arbitrum com destino vinculado",
      },
      {
        id: "PT-03",
        name: "Uniswap V3 USDC/WETH 0.05%",
        type: "pool",
        amountFormatted: "US$ 45.200.000,00",
        detail: "Swap do invasor de USDT para ETH mantendo o taint proporcional",
      },
    ],
    mixerReviews: [
      {
        id: "MX-01",
        mixer: "Tornado Cash 100 ETH Vault",
        target: "0x44fa…9182",
        amountFormatted: "100 ETH (~US$ 265.000)",
        signals: ["Lote idêntico de 100 ETH", "Taxa de gás paga por carteira da camada 1"],
        status: "Pendente de revisão",
      },
      {
        id: "MX-02",
        mixer: "Railgun Privacy Relayer",
        target: "0x98cd…11aa",
        amountFormatted: "50.000 USDC",
        signals: ["Intervalo de 8 minutos entre entrada e saída", "Destino converteu para Pix"],
        status: "Vinculado",
      },
    ],
  },
  channelMessages: [
    {
      id: "MSG-01",
      sender: "Banco Itaú (Equipe MED / PLD)",
      senderRole: "bank",
      timestamp: "30/10/2026 10:45",
      subject: "Abertura de Notificação MED 2.0 · Ref: 2026-MED-88412",
      content: "Vítima reportou golpe de falso investimento via Pix de R$ 500.000,00 convertido em USDT na Binance. Solicitamos retenção cautelar e dados de titularidade da conta de saque.",
      encrypted: true,
      ivms101Payload: {
        originator: "Maria Oliveira Silva (CPF: ***.482.918-**)",
        beneficiary: "0x5227…2f8c (Identificada no saque)",
        accountNumber: "Agência 0482 · CC 99124-1",
        nationalId: "Registro Geral SP 44.192.831",
        actionTaken: "Notificação MED registrada e caso aberto on-chain",
      },
    },
    {
      id: "MSG-02",
      sender: "Binance Compliance Desk",
      senderRole: "exchange",
      timestamp: "30/10/2026 11:10",
      subject: "Resposta Travel Rule IVMS101 · Retenção Confirmada",
      content: "Recebemos o alerta da Spread com score de 98,4%. Depósito de US$ 1.850.000,00 retido na subconta de cliente. Dados do beneficiário cifrados ponta a ponta.",
      encrypted: true,
      ivms101Payload: {
        originator: "Binance Customer Sub-account 44192",
        beneficiary: "João Pedro Mendes (CPF: ***.109.832-**)",
        accountNumber: "Sub-account ID: 994821038",
        nationalId: "Passaporte BR-FP884129",
        actionTaken: "Conta bloqueada para saque e devolução iniciada via MED",
      },
    },
  ],
  freezeReportMarkdown: `# SPREAD FORENSIC INTELLIGENCE - PACOTE DE CONGELAMENTO CAUTELAR
Documento emitido em: 30/10/2026 14:30 UTC
Caso: case-eth-binance-2026 · Exploit Binance
Destinatários: Tether Operations Ltd. (compliance@tether.to) / Circle Financial LLC

## 1. IDENTIFICAÇÃO DO INCIDENTE
- Origem do Ataque: 0x5227c81a287f4c9a59b2f8c871409210928a2f8c
- Volume Total Contaminado: US$ 3.635.335.878,85
- Cadeia de Custódia: Rastreado matematicamente via motor Spread Haircut Taint Model (6 camadas).

## 2. CARTEIRAS COM SALDO ATIVO EM STABLECOIN
A Spread detectou as seguintes contas com ativos parados que devem ser objeto de congelamento imediato:
1. Carteira Origem: 0x5227c81a287f4c9a59b2f8c871409210928a2f8c
   - Saldo a congelar: US$ 1.540.200.000,00 USDT
   - Status: CONGELAMENTO REQUERIDO
2. Carteira Camada 2: 0xc8491823791241908234123490812341234206A
   - Saldo a congelar: US$ 12.450.000,00 USDC
   - Status: CONGELAMENTO REQUERIDO

## 3. PROVA DE CONTAMINAÇÃO MATEMÁTICA
Todas as transferências citadas acima possuem score comprovado superior a 85% de taint direto, sem diluição por fundos de terceiros. Relatório assinado on-chain com hash SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.`,
};

// 2. CASO AO VIVO: BITCOIN EXPLOIT BINANCE
export const BITCOIN_CASE: CaseData = {
  id: "binance-btc",
  chain: "bitcoin",
  name: "Bitcoin · Exploit Binance",
  isLive: true,
  category: "live",
  currency: "em BTC",
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
    restDetail: "Taxas de mineradores e trocos descartados (UTXO)",
  },
  metrics: {
    walletsCount: 30,
    flaggedCount: 30,
    layersCount: 4,
    visualCriticalNodesCount: 30,
  },
  antiPollutionInfo: {
    mode: "Topologia SegWit Completa 1:1",
    description: "Todas as 30 carteiras SegWit nativas (10.270 BTC) identificadas na saída da hot wallet da Binance estão representadas individualmente no grafo e no arquivo CSV.",
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
  ],
  alerts: {
    withdrawals: [
      {
        id: "BTC-WTH-01",
        target: "bc1q…88kl",
        exchange: "Bitfinex Deposit Address",
        amountFormatted: "US$ 4.200.000,00",
        riskScore: "100%",
        action: "RETER",
        status: "Alerta emitido para a custódia da exchange",
        time: "há 5 h",
      },
    ],
    alertPoints: [
      {
        id: "BTC-PT-01",
        name: "CoinJoin Whirlpool Coordinator",
        type: "mixer",
        amountFormatted: "US$ 35.000.000,00",
        detail: "Tentativa de pulverização em rodada UTXO de valor fixo",
      },
    ],
    mixerReviews: [],
  },
  channelMessages: [
    {
      id: "MSG-BTC-01",
      sender: "Sistema de Alertas Spread",
      senderRole: "system",
      timestamp: "29/10/2026 17:50",
      subject: "Detecção de Movimentação em Lote · Bitcoin UTXO",
      content: "Saque da hot wallet da Binance de 10.270 BTC dividido em 10 saques diretos. Monitoramento contínuo das 30 carteiras ativado.",
      encrypted: false,
    },
  ],
  freezeReportMarkdown: `# SPREAD FORENSIC INTELLIGENCE - BITCOIN UTXO AUDIT REPORT
Caso: case-btc-binance-2026 · Exploit Binance
Volume Total: 10.270 BTC (US$ 1.484.900.070,48)
Situação Atual: 95,1% dos fundos permanecem parados em 30 carteiras nativas SegWit.`,
};

// 3. CASO HISTÓRICO: BITGET EXPLOITER 1 (CASO 67)
export const BITGET_CASE: CaseData = {
  id: "bitget-caso-67",
  chain: "ethereum",
  name: "Ethereum / Arbitrum · Bitget Exploiter 1 (Caso 67)",
  isLive: false,
  category: "historical",
  historicalDuration: "reconstruído em 145 s (45 min no escaneamento de 34,8k txs)",
  currency: "em ETH e tokens",
  origin: "0x18a93B7f82b7194A3D097aA32a550974857b29a1",
  originLabel: "0x18a9…29a1",
  openedAt: "24/09/2026, 14:15 UTC - 3",
  lastMove: "25/09/2026, 18:40 UTC - 3",
  lastMoveAgo: "há 35 dias",
  amountUsd: 113600000.0,
  amountFormatted: "US$ 113.600.000,00",
  split: {
    parkedUsd: 17700000.0,
    parkedFormatted: "US$ 17.700.000,00",
    parkedDetail: "US$ 16,3 mi em ETH · US$ 1,4 mi em USDC/USDT pronto para congelamento Circle/Tether",
    inExchangeUsd: 66400000.0,
    inExchangeFormatted: "US$ 66.400.000,00",
    endedUsd: 23400000.0,
    endedFormatted: "US$ 23.400.000,00",
    endedDetail: "Stargate v2 e contratos em catalogação de pontes",
    unexplainedFormatted: "US$ 23.400.000,00 sob catalogação de pontes",
    restUsd: 5400000.0,
    restFormatted: "US$ 5.400.000,00",
    restDetail: "Queima de taxas de gás para travessia entre redes",
  },
  metrics: {
    walletsCount: 1391,
    flaggedCount: 619,
    layersCount: 26,
    visualCriticalNodesCount: 16,
  },
  antiPollutionInfo: {
    mode: "Condensação de Dispersão em Lote (26 Camadas)",
    description: "O grafo exibe os 16 hubs e rotas críticas do hack de US$ 113,6 mi (origem Bitget, pontes THORChain, Chainflip, Across, Stargate, Tornado Cash e saídas para OKX e Binance). As 1.391 carteiras da dispersão profunda e 34,8 mil transferências foram condensadas para preservar a legibilidade e estão 100% listadas no download do CSV.",
  },
  parkedWallets: [
    {
      address: "0x18a9…29a1",
      tag: "origem (Bitget Exploiter 1)",
      type: "parado",
      amountFormatted: "US$ 17,7 mi",
      detail: "US$ 16,3 mi em ETH · US$ 1,4 mi em USDC/USDT",
      timeAgo: "24/09 às 14:15",
      percentWidth: 50,
      color: "#F26A1B",
    },
    {
      address: "0xf33e…CC71",
      tag: "alvo de congelamento Circle (USDC)",
      type: "frozen",
      amountFormatted: "US$ 604,6 mil",
      detail: "parado em carteira comum, emissor Circle pode agir",
      timeAgo: "há 17 dias",
      percentWidth: 20,
      color: "#00ffff",
    },
    {
      address: "0xfd78…D002",
      tag: "alvo de congelamento Tether (USDT)",
      type: "frozen",
      amountFormatted: "US$ 563,0 mil",
      detail: "parado em carteira comum, emissor Tether pode agir",
      timeAgo: "há 17 dias",
      percentWidth: 18,
      color: "#00ffff",
    },
    {
      address: "0x33bA…11ef",
      tag: "subconta OKX Client Deposit",
      type: "parado",
      amountFormatted: "US$ 2,45 mi",
      detail: "depósito retido pelo compliance da OKX",
      timeAgo: "há 17 dias",
      percentWidth: 25,
      color: "#F26A1B",
    },
  ],
  recentMoves: [
    {
      from: "0x18a9…29a1",
      to: "THORChain Router",
      amountFormatted: "US$ 39,9 mi",
      time: "24/09/2026, 14:40 UTC - 3",
      timeAgo: "há 35 dias",
      token: "● Bridge ETH→BTC",
      tokenColor: "text-amber-500",
    },
    {
      from: "0x18a9…29a1",
      to: "Chainflip 96 Canais",
      amountFormatted: "US$ 18,5 mi",
      time: "24/09/2026, 15:10 UTC - 3",
      timeAgo: "há 35 dias",
      token: "● Canais de Depósito",
      tokenColor: "text-blue-400",
    },
    {
      from: "0x18a9…29a1",
      to: "Across SpokePool",
      amountFormatted: "US$ 1,4 mi",
      time: "24/09/2026, 15:35 UTC - 3",
      timeAgo: "há 35 dias",
      token: "● Bridge ETH→Arbitrum",
      tokenColor: "text-blue-400",
    },
    {
      from: "0x99b1…88bB",
      to: "OKX Deposit Subconta",
      amountFormatted: "US$ 2,45 mi",
      time: "24/09/2026, 16:15 UTC - 3",
      timeAgo: "há 35 dias",
      token: "● USDT - Retido",
      tokenColor: "text-emerald-400",
    },
  ],
  alerts: {
    withdrawals: [
      {
        id: "BG-01",
        target: "0x33bA…11ef",
        exchange: "OKX OTC Desk",
        amountFormatted: "US$ 2.450.000,00",
        riskScore: "99,1%",
        action: "RETER",
        status: "Retido cautelarmente pelo compliance da OKX",
        time: "24/09/2026",
      },
      {
        id: "BG-02",
        target: "0x91cA…44f1",
        exchange: "Binance Hot Deposit",
        amountFormatted: "US$ 1.850.000,00",
        riskScore: "92,4%",
        action: "ALERTAR",
        status: "Alerta preventivo emitido à custódia da exchange",
        time: "24/09/2026",
      },
    ],
    alertPoints: [
      {
        id: "BG-PT-01",
        name: "THORChain Cross-Chain Asgard Vault",
        type: "bridge",
        amountFormatted: "US$ 39.928.808,00",
        detail: "Travessia de ETH para rede nativa Bitcoin",
      },
      {
        id: "BG-PT-02",
        name: "Chainflip Liquidity Network (96 canais)",
        type: "bridge",
        amountFormatted: "US$ 18.500.000,00",
        detail: "96 canais de depósito temporários identificados autonomamente pelo Spread",
      },
      {
        id: "BG-PT-03",
        name: "Across Protocol SpokePool (ETH → Arbitrum)",
        type: "bridge",
        amountFormatted: "US$ 1.400.000,00",
        detail: "Destino declarado no contrato e confirmado na saída da Arbitrum",
      },
      {
        id: "BG-PT-04",
        name: "Stargate v2 Router",
        type: "service",
        amountFormatted: "US$ 23.400.000,00",
        detail: "Fim em estudo (ponte com catalogação de eventos em andamento)",
      },
    ],
    mixerReviews: [
      {
        id: "BG-MX-01",
        mixer: "Tornado Cash 100 ETH",
        target: "0x77aa…2211",
        amountFormatted: "US$ 1.200.000,00",
        signals: ["Saques agrupados em janela de 12 minutos"],
        status: "Vinculado",
      },
    ],
  },
  channelMessages: [
    {
      id: "MSG-BG-01",
      sender: "Bitget Security Division",
      senderRole: "exchange",
      timestamp: "24/09/2026 14:20",
      subject: "Abertura de Alerta de Exploit · Caso 67",
      content: "Saque não autorizado de 5.400 ETH para carteira externa. Caso aberto e integrado à Spread.",
      encrypted: true,
    },
    {
      id: "MSG-BG-02",
      sender: "OKX Compliance Response",
      senderRole: "exchange",
      timestamp: "24/09/2026 15:15",
      subject: "Travel Rule IVMS101 · Retenção Efetivada",
      content: "Depósito de US$ 2,45 mi identificado e congelado antes da conversão para moeda fiduciária.",
      encrypted: true,
      ivms101Payload: {
        originator: "0x18a9…29a1",
        beneficiary: "Conta de Cliente OKX 883192",
        accountNumber: "OKX-SUB-881",
        nationalId: "Documentação em revisão de PLD",
        actionTaken: "Valores retidos cautelarmente aguardando decisão judicial",
      },
    },
  ],
  freezeReportMarkdown: `# SPREAD FORENSIC INTELLIGENCE - CASO 67 (BITGET EXPLOITER 1)
Data do Evento: 24/09/2026 · Conclusão Forense em 145 segundos (45 min no escaneamento completo)
Volume Total: US$ 113.600.000,00 (34.800 transferências on-chain, 26 camadas)
Carteiras Marcadas: 619 carteiras com contaminação confirmada
Rastro Total Indexado: 1.391 carteiras (100% listadas no anexo CSV)

Achados Periciais Críticos:
- Destinos principais: THORChain (US$ 39,9 mi para Bitcoin), Chainflip (US$ 18,5 mi em 96 canais de depósito), Across SpokePool (US$ 1,4 mi com destino Arbitrum), Stargate v2 (US$ 23,4 mi).
- Parado em carteiras comuns: US$ 17,7 mi (sendo US$ 1,4 mi em USDC/USDT pronto para congelamento pelos emissores Circle e Tether).
- Retenção em Exchanges: Subconta OKX (US$ 2.450.000,00) retida cautelarmente pelo compliance; Subconta Binance (US$ 1.850.000,00) sob alerta preventivo.
- Algoritmo Anti-Poluição Visual: As 1.391 carteiras da dispersão profunda foram condensadas em 16 hubs estratégicos no grafo para legibilidade do operador, estando 100% dos endereços disponíveis no botão de download CSV.`,
};

// 4. CASO HISTÓRICO: ENDEREÇO ENVENENADO (CASO 1)
export const POISONING_CASE: CaseData = {
  id: "poisoning-case-1",
  chain: "ethereum",
  name: "Ethereum · Endereço Envenenado (Caso 1)",
  isLive: false,
  category: "historical",
  historicalDuration: "reconstruído em 122 s",
  currency: "em USDT e ETH",
  origin: "0x24Ee192837461928374619283746192837463544",
  originLabel: "0x24Ee…3544",
  openedAt: "17/03/2026, 15:58 UTC - 3",
  lastMove: "30/09/2026, 10:45 UTC - 3",
  lastMoveAgo: "há 30 dias",
  amountUsd: 143129.83,
  amountFormatted: "US$ 143.129,83",
  split: {
    parkedUsd: 45000.0,
    parkedFormatted: "US$ 45.000,00",
    parkedDetail: "parado na Polygon após ponte Across",
    inExchangeUsd: 68130.0,
    inExchangeFormatted: "US$ 68.130,00",
    endedUsd: 30000.0,
    endedFormatted: "US$ 30.000,00",
    endedDetail: "Tornado Cash 100 ETH Vault",
    restUsd: 0,
    restFormatted: "US$ 0,00",
    restDetail: "Nenhum valor perdido",
  },
  metrics: {
    walletsCount: 28,
    flaggedCount: 16,
    layersCount: 6,
    visualCriticalNodesCount: 10,
  },
  antiPollutionInfo: {
    mode: "Isolamento de Cluster Pós-Mixer",
    description: "O grafo exibe os 10 nós da cadeia de ataque direto (vítima, carteira envenenada, troca na Uniswap, cofre Tornado Cash e depósitos em exchanges). As 28 carteiras do cluster operacional que sacaram os lotes após o misturador estão detalhadas no download do CSV.",
  },
  parkedWallets: [
    {
      address: "0x24Ee…3544",
      tag: "clone envenenado (bloqueio Tether tardio)",
      type: "frozen",
      amountFormatted: "US$ 0,00",
      detail: "bloqueada pela Tether 14h após o USDT virar ETH",
      timeAgo: "18/03 10:04",
      percentWidth: 10,
      color: "#00ffff",
    },
    {
      address: "0x55cc…9191",
      tag: "Mercado Bitcoin (subconta)",
      type: "parado",
      amountFormatted: "US$ 68.130",
      detail: "retido cautelarmente antes de conversão para Pix",
      timeAgo: "há 19 dias",
      percentWidth: 48,
      color: "#F26A1B",
    },
    {
      address: "0x5c7B…35C5",
      tag: "parado em carteira Polygon",
      type: "parado",
      amountFormatted: "US$ 45.000",
      detail: "147 ETH sacados do mixer e atravessados para Polygon",
      timeAgo: "há 19 dias",
      percentWidth: 32,
      color: "#F26A1B",
    },
  ],
  recentMoves: [
    {
      from: "0x24ee…3544 (Vítima)",
      to: "0x24Ee…3544 (Clone)",
      amountFormatted: "US$ 143.129,83",
      time: "17/03/2026, 15:58 UTC - 3",
      timeAgo: "17/03",
      token: "● USDT",
      tokenColor: "text-emerald-400",
    },
    {
      from: "0x24Ee…3544",
      to: "Uniswap V2 Pair",
      amountFormatted: "40,2 ETH",
      time: "17/03/2026, 19:25 UTC - 3",
      timeAgo: "3h27 depois",
      token: "● Troca DEX USDT→ETH",
      tokenColor: "text-purple-400",
    },
    {
      from: "Concentração (300 ETH)",
      to: "Tornado Cash 100 ETH",
      amountFormatted: "3 x 100 ETH",
      time: "30/09/2026, 10:15 UTC - 3",
      timeAgo: "há 30 dias",
      token: "● Entrada Mixer",
      tokenColor: "text-purple-400",
    },
    {
      from: "Carteira Nova 18/03",
      to: "Mercado Bitcoin Subconta",
      amountFormatted: "US$ 68.130,00",
      time: "30/09/2026, 10:45 UTC - 3",
      timeAgo: "há 30 dias",
      token: "● Saque Fiat Pix (Retido)",
      tokenColor: "text-emerald-400",
    },
  ],
  alerts: {
    withdrawals: [
      {
        id: "PSN-01",
        target: "0x55cc…9191",
        exchange: "Mercado Bitcoin Client Account",
        amountFormatted: "US$ 68.130,00",
        riskScore: "100%",
        action: "RETER",
        status: "Retido cautelarmente antes do saque em Pix",
        time: "30/09/2026",
      },
    ],
    alertPoints: [
      {
        id: "PSN-PT-01",
        name: "Tornado Cash 100 ETH Vault",
        type: "mixer",
        amountFormatted: "US$ 143.129,83",
        detail: "3 depósitos de 100 ETH com saque posterior por 10 carteiras sincronizadas",
      },
      {
        id: "PSN-PT-02",
        name: "Ponte Across Protocol (ETH → Polygon)",
        type: "bridge",
        amountFormatted: "US$ 45.000,00",
        detail: "Destino declarado para rede Polygon",
      },
    ],
    mixerReviews: [
      {
        id: "PSN-MX-01",
        mixer: "Tornado Cash 100 ETH",
        target: "0x99aa…7733",
        amountFormatted: "US$ 143.129,83",
        signals: [
          "10 carteiras com saques diários de 300 ETH no mesmo horário",
          "Divisão em 2 metades de ~147 ETH e ~152 ETH enviadas ao mesmo contrato de ponte",
        ],
        status: "Vinculado",
      },
    ],
  },
  channelMessages: [
    {
      id: "MSG-PSN-01",
      sender: "Banco Santander (MED 2.0)",
      senderRole: "bank",
      timestamp: "17/03/2026 16:10",
      subject: "Relato de Fraude por Envenenamento de Endereço (Address Poisoning)",
      content: "Cliente copiou endereço falso com os mesmos 4 primeiros e últimos caracteres do histórico. Alerta MED 2.0 emitido.",
      encrypted: true,
    },
    {
      id: "MSG-PSN-02",
      sender: "Mercado Bitcoin Compliance Desk",
      senderRole: "exchange",
      timestamp: "30/09/2026 10:50",
      subject: "Retenção Efetivada · Depósito USDT Contaminado",
      content: "Depósito de US$ 68.130 retido cautelarmente 3 minutos após o bloco. Chave Pix bloqueada preventivamente.",
      encrypted: true,
    },
  ],
  freezeReportMarkdown: `# SPREAD FORENSIC INTELLIGENCE - CASO 1 (ENDEREÇO ENVENENADO / VANITY ADDRESS)
Data do Evento: 17/03/2026 · Conclusão em 122 segundos
Valor do Golpe: US$ 143.129,83 USDT
Cluster Operacional Identificado: 28 carteiras (100% listadas no anexo CSV)

Achados Periciais Críticos:
- A vítima transferiu USDT para endereço clonado (mesmos 4 primeiros e últimos caracteres).
- 3h27 após o golpe, todo o USDT foi trocado por 40,2 ETH na Uniswap.
- Bloqueio pelo emissor (Tether): Chegou em 18/03 às 10:04 UTC — 14 horas após a carteira estar vazia (saldo US$ 0,00).
- Saques Pós-Misturador: 10 carteiras sincronizadas sacaram 3x 100 ETH do Tornado Cash no mesmo horário diário, convergindo para pontes e exchanges.
- Retenção Efetiva: US$ 68.130,00 retidos cautelarmente no Mercado Bitcoin antes da liquidação em Pix (protocolo MED 2.0).
- Algoritmo Anti-Poluição Visual: O grafo exibe os 10 nós da cadeia de ataque e pontos de retenção. O cluster completo de 28 carteiras está registrado no download do CSV.`,
};

// 5. CASO HISTÓRICO: BLOQUEIO TETHER USDT NA TRON (CASO 5)
export const TRON_FREEZE_CASE: CaseData = {
  id: "tron-case-5",
  chain: "tron",
  name: "Tron · Bloqueio Tether USDT (Caso 5)",
  isLive: false,
  category: "historical",
  historicalDuration: "reconstruído em 164 s",
  currency: "em USDT TRC-20",
  origin: "THbQpQv88899911122233344455566677788",
  originLabel: "THbQ…788",
  openedAt: "10/10/2026, 11:00 UTC - 3",
  lastMove: "10/10/2026, 13:20 UTC - 3",
  lastMoveAgo: "há 20 dias",
  amountUsd: 75000.0,
  amountFormatted: "US$ 75.000,00",
  split: {
    parkedUsd: 14250.0,
    parkedFormatted: "US$ 14.250,00",
    parkedDetail: "Congelado ou parado em destinos",
    inExchangeUsd: 60750.0,
    inExchangeFormatted: "US$ 60.750,00",
    endedUsd: 0,
    endedFormatted: "US$ 0,00",
    restUsd: 0,
    restFormatted: "US$ 0,00",
    restDetail: "0",
  },
  metrics: {
    walletsCount: 559,
    flaggedCount: 14,
    layersCount: 4,
    visualCriticalNodesCount: 9,
  },
  antiPollutionInfo: {
    mode: "Supressão de Serviços Compartilhados",
    description: "O grafo exibe os 9 nós da rota crítica do golpe (origem do furto, intermediária de 14 min, conta de depósito da HTX e bloqueio da Tether). Os 559 nós e carteiras de terceiros identificados no rastreamento de serviços de alto volume foram isolados para evitar falsos positivos e estão preservados integralmente no download do CSV.",
  },
  parkedWallets: [
    {
      address: "TDepHTX…788",
      tag: "conta de depósito HTX (cliente)",
      type: "parado",
      amountFormatted: "US$ 60.857",
      detail: "depositado 2h antes do bloqueio da Tether",
      timeAgo: "08/10 16:07",
      percentWidth: 81,
      color: "#F26A1B",
    },
    {
      address: "THbQ…788",
      tag: "origem congelada pela Tether",
      type: "frozen",
      amountFormatted: "US$ 0,00",
      detail: "saldo zerado no momento do bloqueio",
      timeAgo: "08/10 18:12",
      percentWidth: 10,
      color: "#00ffff",
    },
    {
      address: "TLyqz…xuW",
      tag: "serviço de alto volume A",
      type: "parado",
      amountFormatted: "US$ 6.200",
      detail: "240 carteiras de terceiros conectadas",
      timeAgo: "30/09 a 06/10",
      percentWidth: 8,
      color: "#F26A1B",
    },
    {
      address: "TKzva…uWwb",
      tag: "serviço de alto volume B",
      type: "parado",
      amountFormatted: "US$ 4.800",
      detail: "185 carteiras de terceiros conectadas",
      timeAgo: "30/09 a 06/10",
      percentWidth: 6,
      color: "#F26A1B",
    },
    {
      address: "TXzAB…j7xA",
      tag: "destino secundário",
      type: "parado",
      amountFormatted: "US$ 2.900",
      detail: "parado em carteira individual",
      timeAgo: "30/09 a 06/10",
      percentWidth: 4,
      color: "#F26A1B",
    },
  ],
  recentMoves: [
    {
      from: "THbQ…788",
      to: "TInterm…788",
      amountFormatted: "US$ 61.044",
      time: "08/10/2026, 15:53 UTC",
      timeAgo: "há 20 dias",
      token: "● USDT TRC-20",
      tokenColor: "text-emerald-400",
    },
    {
      from: "TInterm…788",
      to: "HTX Client Deposit",
      amountFormatted: "US$ 60.857",
      time: "08/10/2026, 16:07 UTC",
      timeAgo: "há 20 dias",
      token: "● USDT - Saque Exchange",
      tokenColor: "text-emerald-400",
    },
    {
      from: "Tether Contract",
      to: "THbQ…788",
      amountFormatted: "AddedBlackList",
      time: "08/10/2026, 18:12 UTC",
      timeAgo: "há 20 dias",
      token: "● Bloqueio Tether (Tarde)",
      tokenColor: "text-cyan-400",
    },
  ],
  alerts: {
    withdrawals: [
      {
        id: "TRON-01",
        target: "TDepHTX…788",
        exchange: "HTX (Huobi) Sub-account",
        amountFormatted: "US$ 60.857,00",
        riskScore: "100%",
        action: "RETER",
        status: "81% do valor entrou na exchange 2h antes da Tether agir",
        time: "08/10 16:07",
      },
    ],
    alertPoints: [
      {
        id: "TRON-PT-01",
        name: "Serviço Alto Volume A (240 peers)",
        type: "service",
        amountFormatted: "US$ 6.200,00",
        detail: "Classificado como serviço compartilhado; isolado para evitar contaminação de terceiros",
      },
      {
        id: "TRON-PT-02",
        name: "Serviço Alto Volume B (185 peers)",
        type: "service",
        amountFormatted: "US$ 4.800,00",
        detail: "Classificado como serviço compartilhado; tráfego de terceiros mantido no CSV",
      },
    ],
    mixerReviews: [],
  },
  channelMessages: [
    {
      id: "MSG-TR-01",
      sender: "Tether Contract Blacklist Watcher",
      senderRole: "system",
      timestamp: "08/10/2026 18:12",
      subject: "Evento On-Chain: AddedBlackList",
      content: "Carteira THbQ…788 bloqueada pelo contrato oficial do USDT na Tron. Saldo retido no momento do bloqueio: US$ 0,00 (esvaziada 2h antes).",
      encrypted: false,
    },
    {
      id: "MSG-TR-02",
      sender: "HTX Compliance Desk",
      senderRole: "exchange",
      timestamp: "08/10/2026 16:10",
      subject: "Alerta Spread Recebido com Sucesso",
      content: "Alerta de depósito sujo de US$ 60.857 recebido 2 minutos após a confirmação do bloco. Subconta retida preventivamente.",
      encrypted: true,
    },
  ],
  freezeReportMarkdown: `# SPREAD FORENSIC INTELLIGENCE - CASO 5 TRON (A EXCHANGE ANTES DO EMISSOR)
Data do Evento: 08/10/2026 · Conclusão em 164 segundos
Valor Total: US$ 75.000,00 USDT TRC-20
Achado Pericial Crítico:
- O bloqueio pelo emissor (Tether) ocorreu às 18:12 UTC.
- A carteira do golpista (THbQ…788) já estava com saldo ZERO.
- Às 16:07 UTC (duas horas antes), US$ 60.857 (81%) já haviam sido transferidos para a HTX.
- Conclusão: A exchange foi o único ponto efetivo de retenção em tempo real. As 559 carteiras indexadas no escaneamento dos serviços de alto volume estão registradas no anexo CSV.`,
};

// Lista de todos os casos disponíveis para o seletor
export const ALL_CASES: CaseData[] = [
  ETHEREUM_CASE,
  BITCOIN_CASE,
  BITGET_CASE,
  POISONING_CASE,
  TRON_FREEZE_CASE,
];

/**
 * Gera a base forense completa de carteiras e nós em formato CSV para exportação pericial.
 * Cada caso produz exatamente o número total de carteiras mapeadas pela Spread na investigação on-chain.
 */
export function generateCaseCsv(caseId: string): string {
  const headers = "Endereco,Rede,Camada,Valor_USD,Valor_Formatado,Situacao,Contaminacao_Pct,Detalhes,Tipo_No\n";
  const rows: string[] = [];

  if (caseId === "bitget-caso-67") {
    // 1.391 registros do Caso Bitget Exploiter 1
    rows.push(`"0x18a93B7f82b7194A3D097aA32a550974857b29a1","Ethereum","Camada 0","113600000.00","US$ 113.600.000,00","Origem do Hack","100%","Bitget Exploiter 1 (Hot Wallets)","Origem"`);
    
    // 96 canais de depósito da Chainflip identificados autonomamente
    for (let i = 1; i <= 96; i++) {
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"0xCf${hex}991823746192837461928374619283746","Ethereum","Camada 2","192708.33","US$ 192.708,33","Canal Chainflip","100%","Canal de depósito temporário Chainflip #${i}","Servico Bridge"`);
    }

    // 15 cofres e roteadores da THORChain (saída para Bitcoin)
    for (let i = 1; i <= 15; i++) {
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"0xD37B${hex}730a1d98d8DC97c42F0Ca46aD7146","Ethereum","Camada 2","2661920.53","US$ 2.661.920,53","Roteador THORChain","100%","Cofre Asgard THORChain #${i}","Bridge Cross-Chain"`);
    }

    // 15 travessias da ponte Across SpokePool (ETH → Arbitrum)
    for (let i = 1; i <= 15; i++) {
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"0x5c7B${hex}e5423a257D81B442095A1a6ced35C5","Ethereum/Arbitrum","Camada 2","93333.33","US$ 93.333,33","Ponte Across SpokePool","100%","Destino declarado no contrato para Arbitrum #${i}","Bridge"`);
    }

    // 15 depósitos no Tornado Cash 100 ETH Vault
    for (let i = 1; i <= 15; i++) {
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"0x12D6${hex}04A9E220743712cE6d9bB1B5616B8Fc","Ethereum","Camada 2","80000.00","US$ 80.000,00","Tornado Cash Vault","100%","Cofre de 100 ETH #${i}","Mixer"`);
    }

    // 20 roteadores Stargate v2 (US$ 23,4 mi em estudo)
    for (let i = 1; i <= 20; i++) {
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"0x8731${hex}18B615f7F6fB9bb67c6833e9c05f1","Ethereum","Camada 2","1170000.00","US$ 1.170.000,00","Stargate Router","100%","Contrato de ponte Stargate v2 #${i}","Contrato Bridge"`);
    }

    // Subcontas de depósito em exchanges parceiras
    rows.push(`"0x33bA19283746192837461928374619283711ef","Ethereum","Camada 4","2450000.00","US$ 2.450.000,00","OKX Client Deposit","99.1%","Depósito retido cautelarmente na OKX antes de conversão fiduciária","Exchange Deposit"`);
    rows.push(`"0x91cA19283746192837461928374619283744f1","Ethereum","Camada 4","1850000.00","US$ 1.850.000,00","Binance Subconta","92.4%","Alerta emitido à custódia da Binance","Exchange Deposit"`);
    rows.push(`"0xKuC1192837461928374619283746192837482a","Ethereum","Camada 4","420000.00","US$ 420.000,00","KuCoin Subconta","78.6%","Conta sob monitoramento em exchange","Exchange Deposit"`);

    // Carteiras paradas principais (ETH, USDC e USDT congeláveis)
    rows.push(`"0x41c88d3c0Eda3F4df0bb4e5D0f4C81cc0232902C","Ethereum","Camada 2","4147958.00","US$ 4.147.958,00","Parado em ETH","30.0%","Carteira comum com saldo parado","Carteira Parada"`);
    rows.push(`"0xE7e68D336F90f98D22A479253eafA5f2424aCaD8","Ethereum","Camada 3","2603078.00","US$ 2.603.078,00","Parado em ETH","61.0%","Carteira intermediária com saldo parado","Carteira Parada"`);
    rows.push(`"0xf33e750336e9C0D4E2f4c0D450d753030693CC71","Ethereum","Camada 2","604690.00","US$ 604.690,00","Parado em USDC","100%","Alvo passível de congelamento direto pelo emissor Circle","Circle Freeze"`);
    rows.push(`"0xfd78EE919681417d192449715b2594ab58f5D002","Ethereum","Camada 3","563045.00","US$ 563.045,00","Parado em USDT","100%","Alvo passível de congelamento direto pelo emissor Tether","Tether Freeze"`);

    // Preenche deterministicamente até exatamente 1.391 carteiras das 26 camadas de dispersão profunda
    const currentCount = rows.length;
    for (let i = currentCount; i < 1391; i++) {
      const layer = (i % 25) + 2;
      const taint = Math.max(1, Math.floor(100 * (1 - layer / 30)));
      const val = Math.max(100, Math.round(50000 / (layer * 0.8) + (i % 73) * 12.5));
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"0x${hex}1a82f${layer.toString(16).padStart(2, "0")}b7194A3D097aA32a550974857b29a1","Ethereum","Camada ${layer}","${val}.00","US$ ${val.toLocaleString("pt-BR")},00","Dispersão profunda","${taint}%","Rastro secundário da camada ${layer} (${i + 1}/1391)","Dispersao"`);
    }
  } else if (caseId === "tron-case-5") {
    // 559 registros do Caso 5 Tron
    rows.push(`"THbQpQv88899911122233344455566677788","Tron","Camada 0","75000.00","US$ 75.000,00","Congelada Tether (Tarde)","100%","Origem do Golpe - Bloqueio Tether às 18:12 UTC (saldo zerado 2h antes)","Origem"`);
    rows.push(`"TInterm99988877766655544433322211122","Tron","Camada 1","61044.00","US$ 61.044,00","Repasse Rápido","100%","Saldo permaneceu apenas 14 min antes do envio para exchange","Intermediaria"`);
    rows.push(`"TDepHTX888777666555444333222111788","Tron","Camada 2","60857.00","US$ 60.857,00","Subconta HTX (Retido)","100%","Depósito retido cautelarmente pela exchange 2h antes do bloqueio da Tether","Exchange Deposit"`);
    rows.push(`"TXzABj7xAj7xAj7xAj7xAj7xAj7xAj7xAj7xA","Tron","Camada 2","2900.00","US$ 2.900,00","Parado em TRC-20","100%","Troco retido em carteira individual","Carteira Parada"`);
    rows.push(`"TKzvaSunSwapPair999888777666555444333","Tron","Camada 1","4800.00","US$ 4.800,00","Troca DEX SunSwap","100%","Pool de liquidez TRC-20 SunSwap","DEX Swap"`);
    
    // 240 carteiras de terceiros do Serviço de Alto Volume A (isoladas via anti-poluição visual)
    for (let i = 1; i <= 240; i++) {
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"TLyqzA_${hex}_xuW888999111222333444555666","Tron","Camada 2","25.83","US$ 25,83","Isolado Anti-Ruído","0.4%","Carteira de terceiro em serviço compartilhado A (não-contaminada)","Serviço Alto Volume A"`);
    }

    // 185 carteiras de terceiros do Serviço de Alto Volume B (isoladas via anti-poluição visual)
    for (let i = 1; i <= 185; i++) {
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"TKzvaB_${hex}_uWwb888999111222333444555666","Tron","Camada 2","25.94","US$ 25,94","Isolado Anti-Ruído","0.5%","Carteira de terceiro em serviço compartilhado B (não-contaminada)","Serviço Alto Volume B"`);
    }

    // 129 nós restantes de staking, delegação de energia e nós validadores TRC20
    const currentTron = rows.length;
    for (let i = currentTron; i < 559; i++) {
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"TRXEnergy_${hex}_BandwidthStakingNode777","Tron","Camada 3","12.50","US$ 12,50","Delegação de Energia","0.1%","Roteamento de largura de banda e taxas TRX","Taxas e Infra"`);
    }
  } else if (caseId === "poisoning-case-1") {
    // 28 registros do Caso 1 Endereço Envenenado
    rows.push(`"0x24ee891238471928374619283746192837463544","Ethereum","Camada 0","143129.83","US$ 143.129,83","Vítima Legítima","100%","Endereço original que a vítima pretendia transferir","Vítima"`);
    rows.push(`"0x24Ee192837461928374619283746192837463544","Ethereum","Camada 1","143129.83","US$ 143.129,83","Endereço Envenenado (Clone)","100%","Endereço falso com mesmos 4 primeiros e últimos caracteres","Origem Golpista"`);
    rows.push(`"0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852","Ethereum","Camada 2","143129.83","US$ 143.129,83","Uniswap V2 Pair","100%","Troca de USDT por 40,2 ETH após 3h27","DEX Swap"`);
    rows.push(`"0x51ab192837461928374619283746192837469911","Ethereum","Camada 2","143129.83","US$ 143.129,83","Carteira Nova (100% Sujo)","100%","Recebeu o ETH trocado","Repasse"`);
    rows.push(`"0x88cc192837461928374619283746192837468822","Ethereum","Camada 3","143129.83","US$ 143.129,83","Concentração 300 ETH","16%","Concentrou ETH de vários golpes antes do mixer","Hub Concentrador"`);
    rows.push(`"0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc","Ethereum","Camada 4","143129.83","US$ 143.129,83","Tornado Cash 100 ETH Vault","100%","3 depósitos no cofre de 100 ETH","Mixer"`);
    
    // 10 carteiras sincronizadas que sacaram 3x 100 ETH
    for (let i = 1; i <= 10; i++) {
      const hex = i.toString(16).padStart(2, "0");
      rows.push(`"0x99aa${hex}2837461928374619283746192837467733","Ethereum","Camada 5","30000.00","US$ 30.000,00","Saque Agrupado Mixer","100%","Carteira #${i} do grupo operacional (saque diário sincronizado)","Cluster Pós-Mixer"`);
    }

    // 10 carteiras de divisão em duas metades (~147 e ~152 ETH)
    for (let i = 1; i <= 10; i++) {
      const hex = i.toString(16).padStart(2, "0");
      rows.push(`"0x77bb${hex}2837461928374619283746192837468844","Ethereum","Camada 5","15000.00","US$ 15.000,00","Divisão de Lote","100%","Divisão de lote de ETH pós-mixer #${i}","Dispersão"`);
    }

    rows.push(`"0x55cc192837461928374619283746192891919191","Ethereum","Camada 5","68130.00","US$ 68.130,00","Mercado Bitcoin (Retido MED)","100%","Retido antes do saque em Pix pelo compliance MB","Exchange Deposit"`);
    rows.push(`"0x5c7BCd6E7De5423a257D81B442095A1a6ced35C5","Arbitrum/Polygon","Camada 5","45000.00","US$ 45.000,00","Ponte Across Protocol","100%","Saída para Polygon/Robinhood","Bridge"`);
  } else if (caseId === "binance-eth") {
    // 109 registros do Ethereum Exploit
    rows.push(`"0x5227c81a287f4c9a59b2f8c871409210928a2f8c","Ethereum","Camada 0","2100000000.00","US$ 2.100.000.000,00","Origem Congelada Tether","100%","Carteira de ataque principal","Origem"`);
    rows.push(`"0x85c18928374619283746192837461928374643D4","Ethereum","Camada 1","438400000.00","US$ 438.400.000,00","Camada 1 Parado","100%","ETH parado em custódia direta","Carteira Parada"`);
    rows.push(`"0xc82019283746192837461928374619283746206A","Ethereum","Camada 2","304100000.00","US$ 304.100.000,00","Camada 2 Parado","100%","ETH parado","Carteira Parada"`);
    
    for (let i = 4; i <= 109; i++) {
      const layer = (i % 6) + 1;
      const taint = Math.max(15, Math.floor(100 * (1 - layer / 8)));
      const val = Math.max(5000, Math.round(15000000 / layer + (i % 41) * 23000));
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"0x${hex}9283746192837461928374619283746a2f8c","Ethereum","Camada ${layer}","${val}.00","US$ ${val.toLocaleString("pt-BR")},00","Dispersão On-Chain","${taint}%","Carteira identificada na camada ${layer} (${i}/109)","Dispersao"`);
    }
  } else if (caseId === "binance-btc") {
    // 30 registros do Bitcoin Exploit
    rows.push(`"bc1q0mtc7784019283726485930219283742mnm","Bitcoin","Camada 0","1484900070.00","US$ 1.484.900.070,00","Hot Wallet Binance","100%","Origem da extração em massa de 10.270 BTC","Origem"`);
    for (let i = 2; i <= 30; i++) {
      const layer = (i % 4) + 1;
      const val = Math.round(1484900070 / 30);
      const hex = i.toString(16).padStart(4, "0");
      rows.push(`"bc1q${hex}7784019283726485930219283742segw","Bitcoin","Camada ${layer}","${val}.00","US$ ${val.toLocaleString("pt-BR")},00","SegWit Nativa Parada","100%","Carteira SegWit nativa parada com 100% de BTC sujo","Carteira Parada"`);
    }
  } else {
    rows.push(`"0x0000000000000000000000000000000000000000","Ethereum","Camada 0","0.00","US$ 0,00","Desconhecido","0%","Registro único","Geral"`);
  }

  return headers + rows.join("\n");
}
