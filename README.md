# Spread · Landing Page

> Landing page institucional da **Spread** — infraestrutura de conformidade e rastreamento de fraudes on-chain (Pix para Cripto, Travel Rule e interceptação de saques).

Construída com **Next.js (App Router)**, **Tailwind CSS v4**, **TypeScript**, integração opcional de leads com **Supabase** e pronta para deploy com 1 clique na **Vercel**.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
* **Node.js**: versão 18 ou superior (recomendado 20+)
* **npm**, **pnpm** ou **yarn**

### Passo a Passo

1. **Clone ou extraia o projeto**:
   ```bash
   cd spread-landing
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente (Opcional)**:
   ```bash
   cp .env.example .env.local
   ```
   > 💡 **Nota:** Em modo de desenvolvimento, se você não preencher as chaves do Supabase, o formulário de contato funciona normalmente e registra o lead diretamente no terminal (console log), sem travar a tela.

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Abra no seu navegador**:
   Acesse [http://localhost:3000](http://localhost:3000)

---

## 📦 Como Subir para o GitHub

Se você for criar um repositório novo no GitHub:

1. Crie um repositório vazio no [GitHub.com](https://github.com/new) (ex: `spread-landing`).
2. No terminal da pasta do projeto, execute:

```bash
git init -b main
git add .
git commit -m "feat: landing page institucional da Spread"
git remote add origin https://github.com/SEU_USUARIO/spread-landing.git
git push -u origin main
```

---

## ☁️ Deploy na Vercel (Produção em 2 Minutos)

1. Conecte sua conta do GitHub na [Vercel](https://vercel.com).
2. Clique em **Add New → Project** e selecione o repositório `spread-landing`.
3. O preset **Next.js** será detectado automaticamente.
4. (Opcional) Adicione as variáveis de ambiente no painel da Vercel:
   * `SUPABASE_URL`
   * `SUPABASE_ANON_KEY`
5. Clique em **Deploy**. A partir daí, qualquer push na branch `main` atualizará a página automaticamente.

---

## 🎨 Design System e Tokens

Os tokens visuais ficam definidos em `src/app/globals.css` no bloco `@theme` (padrão Tailwind CSS v4):

| Token | Hex | Aplicação |
|---|---|---|
| `ink` | `#131B1F` | Fundo dark principal estilo terminal financeiro |
| `surface` | `#1F2937` | Fundo de cards elevados |
| `brand` | `#F26A1B` | Laranja Spread (CTAs principais, bordas e neon glow) |
| `brand-glow` | `#FFC49B` | Luz secundária de gradiente e reflexos |
| `brand-deep` | `#B24A0D` | Laranja de alto contraste AA para texto |
| `paper` | `#FFFFFF` | Seção clara para contraste e quebra de leitura |

* **Tipografia**: Poppins (títulos e textos) e IBM Plex Mono (dados técnicos e códigos).

---

## 🧩 Componentes da Página

* **`Hero`**: Dobra principal de alto impacto com efeito de brilho e botões de conversão ("Agendar uma demo").
* **`TrustBar`**: Faixa com as redes e ativos cobertos (Solana, Ethereum, Tron, Bitcoin, TON, USDC, USDT).
* **`Features`**: Os 3 pilares de valor: Prevenção de Fraudes, Rastreamento em Tempo Real e Relatórios de Compliance.
* **`ProductMockup`**: Demonstração visual do grafo de rastreio e painel de controle.
* **`InteractiveNetworkGraph`**: Gráfico interativo simulando camadas de carteiras.
* **`HowItWorks`**: Seção passo a passo com métricas reais e salvaguardas contra falsos positivos.
* **`Pricing`**: Seção com os 2 planos institucionais ("Spread Antifraude" e "Spread Antifraude + Travel Rule") com precificação sob consulta e CTAs integrados ao console.
* **`Login` (`/login`)**: Console de acesso com abas dinâmicas por produto, validação LEI ISO 17442, derivação local de chaves X25519 e preenchimento de teste (Sandbox).
* **`Contact` / `LeadForm`**: Captação de leads B2B (anti-bot honeypot, validação corporativa e persistência).

---

## 🗄️ Banco de Dados (Supabase Leads)

Para persistir os contatos em produção:
1. No seu projeto do [Supabase](https://supabase.com), abra o **SQL Editor**.
2. Execute o script contido em `supabase/migrations/0001_leads.sql`.
3. O script ativa a política de **Row Level Security (RLS)** permitindo apenas inserções cegas de leads pela landing page.
