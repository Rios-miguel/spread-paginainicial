"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import cytoscape, { Core, EventObject } from "cytoscape";

export interface NodeData {
  id: string;
  name: string;
  label: string;
  size: number;
  fade: number;
  depth: number;
  dirty_usd: number;
  held_usd: number;
  network?: string;
  network_code?: string;
  address: string;
  state: "parked" | "partial" | "passed" | "frozen" | "mixer" | "service" | "exchange_deposit";
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  amount_usd: number;
  width: number;
  label?: string;
  token?: string;
  color?: string;
  kind?: string;
}

// Cores e tokens do Design System da Spread
const ORANGE = "#F26A1B";
const BG = "#0F1014";
const INK = "#ECEAE6";
const SLATE = "#5D636E";
const LINE = "#3A3D47";
const MUTED = "#8B909A";
const FROZEN = "#00ffff";

// --- DATASET REAL BITCOIN EXPLOIT BINANCE (Exatamente como em Image 1) ---
const BTC_ELEMENTS: cytoscape.ElementDefinition[] = [
  // 1. Nó Origem (bc1q...2mnm)
  {
    group: "nodes",
    data: {
      id: "btc_origem",
      name: "BTC · bc1q0mtc…2mnm\n1.484.900.070",
      label: "BTC · bc1q0mtc…2mnm\n1.484.900.070",
      size: 48,
      fade: 1,
      depth: 0,
      dirty_usd: 1484900070,
      held_usd: 0,
      address: "bc1q0mtc7784019283726485930219283742mnm",
      state: "passed",
    },
    classes: "origin passed",
  },

  // 2. Coluna 1 (Camada 1 - 10 nós diretos da Binance, exatamente os valores do print 1)
  {
    group: "nodes",
    data: {
      id: "btc_c1_350",
      name: "350.400.222",
      label: "350.400.222",
      size: 26,
      fade: 1,
      depth: 1,
      dirty_usd: 350400222,
      held_usd: 0,
      address: "bc1qz2jc0981273412349081234123490812z2jc",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c1_300",
      name: "300.400.051",
      label: "300.400.051",
      size: 25,
      fade: 1,
      depth: 1,
      dirty_usd: 300400051,
      held_usd: 0,
      address: "bc1q7l0209812734123490812341234908127l02",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c1_158",
      name: "158.200.000",
      label: "158.200.000",
      size: 23,
      fade: 1,
      depth: 1,
      dirty_usd: 158200000,
      held_usd: 0,
      address: "bc1qw99a0981273412349081234123490812w99a",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c1_124",
      name: "124.495.500",
      label: "124.495.500",
      size: 22,
      fade: 1,
      depth: 1,
      dirty_usd: 124495500,
      held_usd: 0,
      address: "bc1qmfv30981273412349081234123490812mfv3",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c1_81_a",
      name: "81.332.894",
      label: "81.332.894",
      size: 20,
      fade: 1,
      depth: 1,
      dirty_usd: 81332894,
      held_usd: 0,
      address: "bc1qnz7w0981273412349081234123490812nz7w",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c1_81_b",
      name: "81.332.894",
      label: "81.332.894",
      size: 20,
      fade: 1,
      depth: 1,
      dirty_usd: 81332894,
      held_usd: 81332894,
      address: "bc1qk91a0981273412349081234123490812k91a",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c1_81_c",
      name: "81.332.894",
      label: "81.332.894",
      size: 20,
      fade: 1,
      depth: 1,
      dirty_usd: 81332894,
      held_usd: 81332894,
      address: "bc1qm2200981273412349081234123490812m220",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c1_81_d",
      name: "81.332.894",
      label: "81.332.894",
      size: 20,
      fade: 1,
      depth: 1,
      dirty_usd: 81332894,
      held_usd: 81332894,
      address: "bc1q88bb098127341234908123412349081288bb",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c1_81_e",
      name: "81.332.894",
      label: "81.332.894",
      size: 20,
      fade: 1,
      depth: 1,
      dirty_usd: 81332894,
      held_usd: 81332894,
      address: "bc1qga6u0981273412349081234123490812ga6u",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c1_35",
      name: "35.590.281",
      label: "35.590.281",
      size: 18,
      fade: 1,
      depth: 1,
      dirty_usd: 35590281,
      held_usd: 35590281,
      address: "bc1qs9ra0981273412349081234123490812s9ra",
      state: "parked",
    },
    classes: "parked",
  },

  // 3. Coluna 2 (Camada 2 - Intermediárias e paradas)
  {
    group: "nodes",
    data: {
      id: "btc_c2_235",
      name: "235.295.182",
      label: "235.295.182",
      size: 24,
      fade: 1,
      depth: 2,
      dirty_usd: 235295182,
      held_usd: 0,
      address: "bc1qznn60981273412349081234123490812znn6",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c2_81_a",
      name: "81.216.526",
      label: "81.216.526",
      size: 19,
      fade: 1,
      depth: 2,
      dirty_usd: 81216526,
      held_usd: 81216526,
      address: "bc1qtcx80981273412349081234123490812tcx8",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c2_81_b",
      name: "81.216.526",
      label: "81.216.526",
      size: 19,
      fade: 1,
      depth: 2,
      dirty_usd: 81216526,
      held_usd: 81216526,
      address: "bc1q89gw098127341234908123412349081289gw",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c2_155",
      name: "155.151.274",
      label: "155.151.274",
      size: 22,
      fade: 1,
      depth: 2,
      dirty_usd: 155151274,
      held_usd: 155151274,
      address: "bc1q41xg098127341234908123412349081241xg",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c2_313",
      name: "313.202.972",
      label: "313.202.972",
      size: 24,
      fade: 1,
      depth: 2,
      dirty_usd: 313202972,
      held_usd: 0,
      address: "bc1q99aa098127341234908123412349081299aa",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c2_77",
      name: "77.600.000",
      label: "77.600.000",
      size: 19,
      fade: 1,
      depth: 2,
      dirty_usd: 77600000,
      held_usd: 77600000,
      address: "bc1q770009812734123490812341234908127700",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c2_468",
      name: "468.427.195",
      label: "468.427.195",
      size: 25,
      fade: 1,
      depth: 2,
      dirty_usd: 468427195,
      held_usd: 0,
      address: "bc1q468809812734123490812341234908124688",
      state: "passed",
    },
    classes: "passed",
  },

  // 4. Coluna 3 (Camada 3)
  {
    group: "nodes",
    data: {
      id: "btc_c3_81_a",
      name: "81.216.211",
      label: "81.216.211",
      size: 19,
      fade: 1,
      depth: 3,
      dirty_usd: 81216211,
      held_usd: 81216211,
      address: "bc1q1syx09812734123490812341234908121syx",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c3_55",
      name: "55.839.059",
      label: "55.839.059",
      size: 20,
      fade: 1,
      depth: 3,
      dirty_usd: 55839059,
      held_usd: 0,
      address: "bc1q558809812734123490812341234908125588",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_c3_328",
      name: "328.602.841",
      label: "328.602.841",
      size: 24,
      fade: 1,
      depth: 3,
      dirty_usd: 328602841,
      held_usd: 0,
      address: "bc1q328809812734123490812341234908123288",
      state: "passed",
    },
    classes: "passed",
  },

  // 5. Coluna 4 (Camada 4)
  {
    group: "nodes",
    data: {
      id: "btc_c4_81",
      name: "81.215.374",
      label: "81.215.374",
      size: 19,
      fade: 1,
      depth: 4,
      dirty_usd: 81215374,
      held_usd: 81215374,
      address: "bc1qwjxp0981273412349081234123490812wjxp",
      state: "parked",
    },
    classes: "parked",
  },

  // 6. Coluna 5 (Carteiras de Saque / Endpoints à direita do print 1)
  {
    group: "nodes",
    data: {
      id: "btc_end_cc5v",
      name: "BTC · bc1q…cc5v",
      label: "BTC · bc1q…cc5v",
      size: 14,
      fade: 0.8,
      depth: 5,
      dirty_usd: 7200000,
      held_usd: 0,
      address: "bc1qcc5v0981273412349081234123490812cc5v",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_end_9xut",
      name: "BTC · bc1q…9xut",
      label: "BTC · bc1q…9xut",
      size: 14,
      fade: 0.8,
      depth: 5,
      dirty_usd: 8500000,
      held_usd: 0,
      address: "bc1q9xut09812734123490812341234908129xut",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_end_0s52",
      name: "BTC · bc1q…0s52",
      label: "BTC · bc1q…0s52",
      size: 14,
      fade: 0.8,
      depth: 5,
      dirty_usd: 6400000,
      held_usd: 0,
      address: "bc1q0s5209812734123490812341234908120s52",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_end_w6cy",
      name: "BTC · bc1q…w6cy",
      label: "BTC · bc1q…w6cy",
      size: 14,
      fade: 0.8,
      depth: 5,
      dirty_usd: 9100000,
      held_usd: 0,
      address: "bc1qw6cy0981273412349081234123490812w6cy",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "btc_end_2a3c",
      name: "BTC · bc1q…2a3c",
      label: "BTC · bc1q…2a3c",
      size: 14,
      fade: 0.8,
      depth: 5,
      dirty_usd: 5200000,
      held_usd: 0,
      address: "bc1q2a3c09812734123490812341234908122a3c",
      state: "passed",
    },
    classes: "passed",
  },

  // --- ARESTAS BITCOIN COM VALORES E CONEXÕES IDÊNTICAS AO PRINT 1 ---
  {
    group: "edges",
    data: {
      id: "e_orig_350",
      source: "btc_origem",
      target: "btc_c1_350",
      amount_usd: 350400222,
      width: 5.5,
      label: "US$ 350,4 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "e_orig_300",
      source: "btc_origem",
      target: "btc_c1_300",
      amount_usd: 300400051,
      width: 5.2,
      label: "US$ 300,4 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "e_orig_158",
      source: "btc_origem",
      target: "btc_c1_158",
      amount_usd: 158200000,
      width: 4.5,
      label: "US$ 158,2 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "e_orig_124",
      source: "btc_origem",
      target: "btc_c1_124",
      amount_usd: 124495500,
      width: 4.2,
      label: "US$ 124,5 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "e_orig_81a",
      source: "btc_origem",
      target: "btc_c1_81_a",
      amount_usd: 81332894,
      width: 3.8,
      label: "US$ 81,3 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "e_orig_81b",
      source: "btc_origem",
      target: "btc_c1_81_b",
      amount_usd: 81332894,
      width: 3.8,
      label: "US$ 81,3 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "e_orig_81c",
      source: "btc_origem",
      target: "btc_c1_81_c",
      amount_usd: 81332894,
      width: 3.8,
      label: "US$ 81,3 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "e_orig_81d",
      source: "btc_origem",
      target: "btc_c1_81_d",
      amount_usd: 81332894,
      width: 3.8,
      label: "US$ 81,3 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "e_orig_81e",
      source: "btc_origem",
      target: "btc_c1_81_e",
      amount_usd: 81332894,
      width: 3.8,
      label: "US$ 81,3 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "e_orig_35",
      source: "btc_origem",
      target: "btc_c1_35",
      amount_usd: 35590281,
      width: 3.0,
      label: "US$ 35,6 mi",
    },
  },

  // Camada 1 -> Camada 2
  {
    group: "edges",
    data: {
      id: "e_350_235",
      source: "btc_c1_350",
      target: "btc_c2_235",
      amount_usd: 235295182,
      width: 4.8,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_350_81a",
      source: "btc_c1_350",
      target: "btc_c2_81_a",
      amount_usd: 81216526,
      width: 3.8,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_300_81b",
      source: "btc_c1_300",
      target: "btc_c2_81_b",
      amount_usd: 81216526,
      width: 3.8,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_300_155",
      source: "btc_c1_300",
      target: "btc_c2_155",
      amount_usd: 155151274,
      width: 4.5,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_158_313",
      source: "btc_c1_158",
      target: "btc_c2_313",
      amount_usd: 313202972,
      width: 5.0,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_124_77",
      source: "btc_c1_124",
      target: "btc_c2_77",
      amount_usd: 77600000,
      width: 3.7,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_81a_468",
      source: "btc_c1_81_a",
      target: "btc_c2_468",
      amount_usd: 468427195,
      width: 5.8,
    },
  },

  // Camada 2 -> Camada 3
  {
    group: "edges",
    data: {
      id: "e_235_c3a",
      source: "btc_c2_235",
      target: "btc_c3_81_a",
      amount_usd: 81216211,
      width: 3.8,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_235_55",
      source: "btc_c2_235",
      target: "btc_c3_55",
      amount_usd: 55839059,
      width: 3.4,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_313_328",
      source: "btc_c2_313",
      target: "btc_c3_328",
      amount_usd: 328602841,
      width: 5.0,
    },
  },

  // Camada 3 -> Camada 4
  {
    group: "edges",
    data: {
      id: "e_55_c4",
      source: "btc_c3_55",
      target: "btc_c4_81",
      amount_usd: 81215374,
      width: 3.8,
    },
  },

  // Saídas para carteiras terminais à direita
  {
    group: "edges",
    data: {
      id: "e_end_1",
      source: "btc_c2_235",
      target: "btc_end_cc5v",
      amount_usd: 7200000,
      width: 1.5,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_end_2",
      source: "btc_c3_55",
      target: "btc_end_9xut",
      amount_usd: 8500000,
      width: 1.5,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_end_3",
      source: "btc_c3_328",
      target: "btc_end_0s52",
      amount_usd: 6400000,
      width: 1.5,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_end_4",
      source: "btc_c4_81",
      target: "btc_end_w6cy",
      amount_usd: 9100000,
      width: 1.5,
    },
  },
  {
    group: "edges",
    data: {
      id: "e_end_5",
      source: "btc_c4_81",
      target: "btc_end_2a3c",
      amount_usd: 5200000,
      width: 1.5,
    },
  },
];

// --- DATASET REAL ETHEREUM EXPLOIT BINANCE ---
const ETH_ELEMENTS: cytoscape.ElementDefinition[] = [
  {
    group: "nodes",
    data: {
      id: "tornado",
      name: "Tornado Cash\nUS$ 12,5 mi",
      label: "Tornado Cash",
      size: 32,
      fade: 1,
      depth: 0,
      dirty_usd: 12500000,
      held_usd: 0,
      address: "0x7C06b7a5a898b14e5CA0...",
      state: "mixer",
    },
    classes: "mixer",
  },
  {
    group: "nodes",
    data: {
      id: "origem_eth",
      name: "0x5227…2f8c\nUS$ 2,1 bi",
      label: "0x5227…2f8c\nUS$ 2,1 bi",
      size: 46,
      fade: 1,
      depth: 0,
      dirty_usd: 2100000000,
      held_usd: 2100000000,
      address: "0x5227c81a287f4c9a59b2f8c871409210928a2f8c",
      state: "frozen",
    },
    classes: "origin marked frozen",
  },
  {
    group: "nodes",
    data: {
      id: "c1_8543",
      name: "0x85…43D4\nUS$ 438,4 mi",
      label: "0x85…43D4",
      size: 32,
      fade: 1,
      depth: 1,
      dirty_usd: 438400000,
      held_usd: 438400000,
      address: "0x8543d410982736412349081234123490812343D4",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "c1_7954",
      name: "0x79…544A\nUS$ 251,6 mi",
      label: "0x79…544A",
      size: 28,
      fade: 0.98,
      depth: 1,
      dirty_usd: 251600000,
      held_usd: 50000000,
      address: "0x7912544a0981273412349081234123490812544A",
      state: "partial",
    },
    classes: "partial",
  },
  {
    group: "nodes",
    data: {
      id: "c1_dd22",
      name: "0xdD…2296\nUS$ 180 mi",
      label: "0xdD…2296",
      size: 26,
      fade: 0.95,
      depth: 1,
      dirty_usd: 180000000,
      held_usd: 0,
      address: "0xdD229609812734123490812341234908122296",
      state: "passed",
    },
    classes: "passed",
  },
  {
    group: "nodes",
    data: {
      id: "c1_uniswap",
      name: "UniswapV2Pair\nUS$ 35 mi",
      label: "UniswapV2Pair",
      size: 26,
      fade: 0.84,
      depth: 1,
      dirty_usd: 35000000,
      held_usd: 0,
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      state: "service",
    },
    classes: "labeled",
  },
  {
    group: "nodes",
    data: {
      id: "c2_c820",
      name: "0xc8…206A\nUS$ 304,1 mi",
      label: "0xc8…206A",
      size: 30,
      fade: 0.96,
      depth: 2,
      dirty_usd: 304100000,
      held_usd: 304100000,
      address: "0xc8206a0981273412349081234123490812206A",
      state: "parked",
    },
    classes: "parked",
  },
  {
    group: "nodes",
    data: {
      id: "c2_14fa",
      name: "0x14…Fa9B\nUS$ 112 mi",
      label: "0x14…Fa9B",
      size: 24,
      fade: 0.88,
      depth: 2,
      dirty_usd: 112000000,
      held_usd: 25000000,
      address: "0x14fa9b0981273412349081234123490812Fa9B",
      state: "partial",
    },
    classes: "partial",
  },
  {
    group: "nodes",
    data: {
      id: "c3_tonnel",
      name: "Tonnel Relayer\nUS$ 28 mi",
      label: "Tonnel Relayer",
      size: 28,
      fade: 0.95,
      depth: 3,
      dirty_usd: 28000000,
      held_usd: 0,
      address: "0x99bb120981273412349081234123490812bb12",
      state: "mixer",
    },
    classes: "mixer",
  },
  {
    group: "nodes",
    data: {
      id: "c4_otc1",
      name: "OTC Desk Relay\nUS$ 47 mi",
      label: "OTC Desk Relay",
      size: 26,
      fade: 0.85,
      depth: 4,
      dirty_usd: 47000000,
      held_usd: 0,
      address: "0x00bb4512981273412349081234123490812bb45",
      state: "exchange_deposit",
    },
    classes: "exchange_deposit",
  },
  {
    group: "nodes",
    data: {
      id: "c5_frozen2",
      name: "Tether Blacklist\nUS$ 24,4 mi",
      label: "Tether Blacklist",
      size: 30,
      fade: 1,
      depth: 5,
      dirty_usd: 24400000,
      held_usd: 24400000,
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      state: "frozen",
    },
    classes: "marked frozen",
  },

  // Arestas Ethereum
  {
    group: "edges",
    data: {
      id: "eth_e1",
      source: "tornado",
      target: "origem_eth",
      amount_usd: 12500000,
      width: 3.5,
      label: "US$ 12,5 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "eth_e2",
      source: "origem_eth",
      target: "c1_8543",
      amount_usd: 438400000,
      width: 5.8,
      label: "US$ 438,4 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "eth_e3",
      source: "origem_eth",
      target: "c1_7954",
      amount_usd: 251600000,
      width: 4.8,
      label: "US$ 251,6 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "eth_e4",
      source: "origem_eth",
      target: "c1_dd22",
      amount_usd: 180000000,
      width: 4.5,
      label: "US$ 180 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "eth_e5",
      source: "c1_dd22",
      target: "c1_uniswap",
      amount_usd: 35000000,
      width: 3.0,
      label: "US$ 35 mi",
    },
    classes: "swap",
  },
  {
    group: "edges",
    data: {
      id: "eth_e6",
      source: "c1_8543",
      target: "c2_c820",
      amount_usd: 304100000,
      width: 5.2,
      label: "US$ 304,1 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "eth_e7",
      source: "c1_7954",
      target: "c2_14fa",
      amount_usd: 112000000,
      width: 4.0,
      label: "US$ 112 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "eth_e8",
      source: "c2_14fa",
      target: "c3_tonnel",
      amount_usd: 28000000,
      width: 2.8,
      label: "US$ 28 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "eth_e9",
      source: "c2_c820",
      target: "c4_otc1",
      amount_usd: 47000000,
      width: 3.5,
      label: "US$ 47 mi",
    },
  },
  {
    group: "edges",
    data: {
      id: "eth_e10",
      source: "c4_otc1",
      target: "c5_frozen2",
      amount_usd: 24400000,
      width: 3.0,
      label: "US$ 24,4 mi",
    },
  },
];

export function CytoscapeSpreadGraph({
  chain = "bitcoin",
  onSelectNode,
}: {
  chain?: "ethereum" | "bitcoin";
  onSelectNode?: (node: NodeData | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [currentView, setCurrentView] = useState<"auto" | "trail" | "full">("full");

  // Executa o layout idêntico ao dashboard da Spread
  const runLayout = useCallback(() => {
    const cy = cyRef.current;
    if (!cy) return;

    const roots = cy.nodes().filter((n) => n.data("depth") === 0);

    cy.layout({
      name: "breadthfirst",
      directed: true,
      roots: roots.nonempty() ? roots : undefined,
      spacingFactor: 1.15,
      animate: true,
      animationDuration: 450,
      fit: true,
      padding: 50,
      // Gira para horizontal: X é a camada (profundidade), Y é a distribuição vertical
      transform: (_node, p) => ({ x: p.y * 1.9, y: p.x * 0.62 }),
    } as cytoscape.BreadthFirstLayoutOptions).run();
  }, []);

  // Inicializa o Cytoscape com os estilos originais do Spread (dashboard/app.js)
  useEffect(() => {
    if (!containerRef.current) return;

    const elements = chain === "bitcoin" ? BTC_ELEMENTS : ETH_ELEMENTS;

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      wheelSensitivity: 0.25,
      boxSelectionEnabled: false,
      style: [
        // Nó padrão
        {
          selector: "node",
          style: {
            "background-color": ORANGE,
            "background-opacity": "data(fade)",
            width: "data(size)",
            height: "data(size)",
            label: "data(label)",
            color: INK,
            "font-size": 11,
            "font-weight": 600,
            "text-valign": "bottom",
            "text-margin-y": 6,
            "font-family": "IBM Plex Mono, monospace",
            "text-outline-color": BG,
            "text-wrap": "wrap",
            "text-outline-width": 2,
            "border-width": 0,
            "min-zoomed-font-size": 6,
          },
        },
        // Parcial: anel laranja com fundo escuro
        {
          selector: "node.partial",
          style: {
            "background-color": BG,
            "background-opacity": 1,
            "border-width": 4,
            "border-color": ORANGE,
            "border-opacity": "data(fade)",
          },
        },
        // Passou: anel cinza claro (vazado)
        {
          selector: "node.passed",
          style: {
            "background-color": BG,
            "background-opacity": 1,
            "border-width": 2,
            "border-color": INK,
            "border-opacity": "data(fade)",
          },
        },
        // Origem
        {
          selector: "node.origin",
          style: {
            "font-size": 12,
            "font-weight": 700,
          },
        },
        // Mixer: losango
        {
          selector: "node.mixer",
          style: {
            shape: "diamond",
            "background-color": "#a855f7",
            "background-opacity": 1,
            "border-width": 0,
            width: 32,
            height: 32,
          },
        },
        // Conta de exchange
        {
          selector: "node.exchange_deposit",
          style: {
            shape: "round-rectangle",
            "background-color": BG,
            "background-opacity": 1,
            "border-width": 3,
            "border-color": ORANGE,
            width: 30,
            height: 30,
          },
        },
        // Congelada (Tether / Circle)
        {
          selector: "node.frozen, node.marked",
          style: {
            "border-width": 5,
            "border-style": "double",
            "border-color": FROZEN,
            "border-opacity": 1,
            "underlay-color": FROZEN,
            "underlay-opacity": 0.35,
            "underlay-padding": 4,
          },
        },
        // Seleção do nó
        {
          selector: "node:selected, node.hover",
          style: {
            "underlay-color": ORANGE,
            "underlay-opacity": 0.28,
            "underlay-padding": 8,
            "underlay-shape": "ellipse",
            "z-index": 10,
          },
        },
        // Arestas (Linhas conectando as carteiras)
        {
          selector: "edge",
          style: {
            width: "data(width)",
            "line-color": ORANGE,
            "target-arrow-color": ORANGE,
            "target-arrow-shape": "triangle",
            "arrow-scale": 0.8,
            "curve-style": "bezier",
            opacity: 0.95,
            label: "data(label)",
            "font-size": 9,
            "font-family": "IBM Plex Mono, monospace",
            color: INK,
            "text-background-color": BG,
            "text-background-opacity": 0.85,
            "text-background-padding": "2px",
            "text-rotation": "autorotate",
          },
        },
        // Arestas de swap (troca): pontilhadas
        {
          selector: "edge.swap",
          style: {
            "line-style": "dashed",
            "line-color": "#38bdf8",
            "target-arrow-color": "#38bdf8",
          },
        },
      ] as any,
    });

    cyRef.current = cy;

    // Eventos de clique e hover
    cy.on("tap", "node", (ev: EventObject) => {
      const data = ev.target.data() as NodeData;
      setSelectedNode(data);
      if (onSelectNode) onSelectNode(data);
    });

    cy.on("tap", (ev: EventObject) => {
      if (ev.target === cy) {
        setSelectedNode(null);
        if (onSelectNode) onSelectNode(null);
      }
    });

    cy.on("mouseover", "node", (ev: EventObject) => {
      ev.target.addClass("hover");
    });

    cy.on("mouseout", "node", (ev: EventObject) => {
      ev.target.removeClass("hover");
    });

    runLayout();

    return () => {
      cy.destroy();
    };
  }, [chain, onSelectNode, runLayout]);

  const handleZoom = (delta: number) => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.zoom({
      level: cy.zoom() * (1 + delta),
      renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
    });
  };

  const handleFit = () => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.fit(undefined, 50);
  };

  return (
    <div className="relative size-full min-h-[620px] rounded-2xl border border-line bg-[#0c1114] overflow-hidden">
      {/* Container do Cytoscape */}
      <div ref={containerRef} className="size-full min-h-[620px]" />

      {/* Controles de Zoom e Visualização (Idênticos ao print 1 da Spread) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-xl border border-line bg-surface/90 p-1.5 backdrop-blur-md">
        <button
          type="button"
          onClick={() => handleZoom(0.25)}
          className="size-8 rounded-lg border border-line bg-surface-2 text-white hover:border-brand font-mono font-bold flex items-center justify-center"
          title="Zoom +"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => handleZoom(-0.25)}
          className="size-8 rounded-lg border border-line bg-surface-2 text-white hover:border-brand font-mono font-bold flex items-center justify-center"
          title="Zoom -"
        >
          −
        </button>
        <button
          type="button"
          onClick={handleFit}
          className="h-8 px-3 rounded-lg border border-line bg-surface-2 text-xs font-medium text-white hover:border-brand"
        >
          Ver tudo
        </button>
        <span className="hidden sm:inline-block px-2 font-mono text-[11px] text-muted border-l border-line">
          arraste para navegar · role para zoom
        </span>
      </div>

      {/* Seletor de Visão no Canto Inferior Esquerdo (Idêntico ao print 1) */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-3">
        <div className="flex items-center gap-1 rounded-xl border border-line bg-surface/90 p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setCurrentView("auto")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              currentView === "auto"
                ? "bg-surface-2 text-white font-bold border border-line"
                : "text-muted hover:text-white"
            }`}
          >
            Automática
          </button>
          <button
            type="button"
            onClick={() => setCurrentView("trail")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              currentView === "trail"
                ? "bg-surface-2 text-white font-bold border border-line"
                : "text-muted hover:text-white"
            }`}
          >
            Rastro do caso
          </button>
          <button
            type="button"
            onClick={() => setCurrentView("full")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              currentView === "full"
                ? "bg-surface-2 text-white font-bold border border-line"
                : "text-muted hover:text-white"
            }`}
          >
            Completo
          </button>
        </div>

        {/* Legenda Oficial Completa (Idêntica à imagem 1) */}
        <div className="rounded-2xl border border-line bg-surface/90 p-4 backdrop-blur-md text-[11px] space-y-2.5 max-w-[280px] shadow-2xl">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-brand inline-block shrink-0" />
              <span className="text-muted">parado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full border-2 border-brand bg-ink inline-block shrink-0" />
              <span className="text-muted">parte ficou, parte seguiu</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full border border-white/60 bg-transparent inline-block shrink-0" />
              <span className="text-muted">passou adiante</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm border-2 border-brand bg-ink inline-block shrink-0" />
              <span className="text-muted">conta na exchange (saque)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm bg-brand inline-block shrink-0" />
              <span className="text-muted">exchange</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm bg-blue-500 inline-block shrink-0" />
              <span className="text-muted">pool, bridge, serviço</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rotate-45 bg-purple-500 inline-block shrink-0" />
              <span className="text-muted">mixer (a heurística segue os saques)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full border-2 border-[#00ffff] bg-ink inline-block shrink-0 shadow-[0_0_8px_#00ffff]" />
              <span className="text-white font-medium">congelada (Tether, Circle)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-line space-y-1">
            <span className="font-mono text-[10px] text-white uppercase block font-semibold">
              linhas: a moeda que passou
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              <span className="flex items-center gap-1.5 text-muted">
                <i className="w-3 h-0.5 bg-[#3ddc97] inline-block" /> USDT
              </span>
              <span className="flex items-center gap-1.5 text-muted">
                <i className="w-3 h-0.5 bg-[#38bdf8] inline-block" /> USDC
              </span>
              <span className="flex items-center gap-1.5 text-muted">
                <i className="w-3 h-0.5 bg-[#c084fc] inline-block" /> ETH
              </span>
              <span className="flex items-center gap-1.5 text-muted">
                <i className="w-3 h-0.5 bg-[#f59e0b] inline-block" /> BTC, WBTC
              </span>
              <span className="flex items-center gap-1.5 text-muted">
                <i className="w-3 h-0.5 bg-[#facc15] inline-block" /> DAI
              </span>
              <span className="flex items-center gap-1.5 text-muted">
                <i className="w-3 h-0.5 bg-[#818cf8] inline-block" /> outros tokens
              </span>
            </div>
          </div>

          <p className="pt-1.5 text-[10px] text-muted border-t border-line leading-tight">
            tamanho = valor do caso · cor mais fraca = menor % sujo · linha mais forte = mais dinheiro; o valor aparece nas maiores e ao passar o mouse
          </p>
        </div>
      </div>

      {/* Card Flutuante de Inspeção ao Clicar no Nó */}
      {selectedNode && (
        <div className="absolute top-4 left-4 z-20 w-80 rounded-2xl border border-brand/50 bg-surface/95 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <span className="font-mono text-xs text-brand uppercase font-bold">
              Camada {selectedNode.depth} · Carteira Selecionada
            </span>
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="text-muted hover:text-white font-mono text-xs"
            >
              ✕
            </button>
          </div>
          <div className="mt-3 space-y-2 font-mono text-xs">
            <div>
              <p className="text-[11px] text-muted">Endereço:</p>
              <p className="text-white break-all font-semibold select-all">{selectedNode.address}</p>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-muted">Valor Total Recebido:</span>
              <span className="font-bold text-white">US$ {selectedNode.dirty_usd.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-muted">Valor Parado Agora:</span>
              <span className="font-bold text-neon-lime">US$ {selectedNode.held_usd.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-muted">Situação:</span>
              <span className="text-white capitalize">{selectedNode.state}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
