# Spread · Landing page

Landing page da Spread (rastreio on-chain de golpes para compliance e risco).
Next.js (App Router) · Tailwind CSS v4 · Supabase (leads) · deploy na Vercel.

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha SUPABASE_URL e SUPABASE_ANON_KEY
npm run dev                  # http://localhost:3000
```

Sem as variáveis do Supabase, em desenvolvimento o formulário funciona e só registra o lead no terminal.

## Design system

Os tokens ficam em `src/app/globals.css` (bloco `@theme`, o equivalente ao `tailwind.config.ts` no Tailwind v4):

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#131b1f` | fundo principal (dark, "terminal") |
| `surface` | `#1f2937` | cards |
| `brand` | `#F26A1B` | laranja Spread, no papel do "neon" (CTAs, bordas no hover, blur) |
| `brand-glow` | `#FFC49B` | segunda luz do blur e do gradiente |
| `brand-deep` | `#B24A0D` | laranja com contraste AA sobre branco |
| `paper` | `#FFFFFF` | seção clara (contraste) |

Tipografia: Poppins (títulos e texto) e IBM Plex Mono (detalhes de terminal).

## Estrutura

| Componente | Seção |
|---|---|
| `Hero` | dobra principal: blur laranja, h1 com gradiente, CTAs "Agendar uma demo" e "Falar com especialistas" |
| `TrustBar` | redes e ativos cobertos (Solana, USDC, USDT, Token-2022, DEXs/bridges, Pix) |
| `Features` | 3 pilares: Prevenção de Fraudes, Rastreamento de Ativos, Relatórios de Compliance |
| `ProductMockup` | painel ilustrativo (grafo, KPIs, alertas, API) na transição escuro → claro |
| `HowItWorks` | seção branca: passo a passo, salvaguardas e números com fonte |
| `Contact` + `LeadForm` | captação: nome, e-mail corporativo, empresa |

## Leads no Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, rode `supabase/migrations/0001_leads.sql`.
   - Cria `public.leads`, liga **RLS** e deixa a chave anon **só inserir** (`name`, `email`, `company`, `source`).
   - Não há policy de `SELECT`: a landing não lê nada. Os leads aparecem no **Table Editor**.
3. Em **Project Settings → API**, copie a URL e a chave **anon/publishable** para `SUPABASE_URL` e `SUPABASE_ANON_KEY`.
   Nunca use a `service_role` key na landing.

O envio passa por uma Server Action (`src/app/actions.ts`): honeypot anti-robô, validação no servidor (inclusive
bloqueio de e-mail pessoal) e `insert` sem `select`. E-mail repetido é tratado como sucesso.

Teste rápido da RLS (deve falhar com permissão negada):

```bash
curl "$SUPABASE_URL/rest/v1/leads?select=*" -H "apikey: $SUPABASE_ANON_KEY"
```

## Git, GitHub e Vercel (CI/CD)

```bash
git init -b main
git add .
git commit -m "feat: landing page da Spread"
git remote add origin https://github.com/<org>/spread-landing.git
git push -u origin main
```

Na Vercel: **Add New → Project → Import** o repositório (o preset Next.js é detectado), cadastre
`SUPABASE_URL`, `SUPABASE_ANON_KEY` e `NEXT_PUBLIC_SITE_URL` em **Environment Variables** e faça o deploy.
A partir daí, todo push na `main` publica em produção, e cada pull request ganha uma URL de preview.
