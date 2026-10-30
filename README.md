# Spread · Landing Page

> Landing page institucional da **Spread**: Travel Rule para a Res. BCB 520/2025 (produto principal) e a inteligência antifraude que retém o saque do dinheiro de golpe.

Construída com **Next.js (App Router)**, **Tailwind CSS v4**, **TypeScript**, leads gravados no **PostgreSQL** da Spread e pronta para deploy com 1 clique na **Vercel**.

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
   > 💡 **Nota:** Em modo de desenvolvimento, se você não preencher `DATABASE_URL`, o formulário de contato funciona normalmente e registra o lead diretamente no terminal (console log), sem travar a tela.

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
   * `DATABASE_URL`
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
* **`TrustBar`**: Faixa com as redes lidas pelo antifraude (Bitcoin, Ethereum, Solana, Tron, TON, Arbitrum, Polygon e Robinhood Chain).
* **`Features`**: Os 3 pilares: Travel Rule, Antifraude (reter o saque) e Compliance e auditoria.
* **`ProductMockup`**: Demonstração visual do grafo de rastreio e painel de controle.
* **`InteractiveNetworkGraph`**: Gráfico interativo simulando camadas de carteiras.
* **`HowItWorks`**: Um saque com Travel Rule passo a passo, as salvaguardas e números do mercado.
* **`Pricing`**: Os 2 planos ("Spread Travel Rule", o principal, e o módulo "Inteligência Spread · Antifraude", em desenvolvimento), com preço sob consulta e CTAs integrados ao console.
* **`Login` (`/login`)**: Console de acesso com abas dinâmicas por produto, validação LEI ISO 17442, derivação local de chaves X25519 e preenchimento de teste (Sandbox).
* **`Contact` / `LeadForm`**: Captação de leads B2B (anti-bot honeypot, validação corporativa e persistência).

---

## 🗄️ Banco de Dados (Leads no PostgreSQL)

Para persistir os contatos em produção:
1. Crie o banco `site` e o usuário `site_landing` no PostgreSQL da Spread.
2. Rode, como dono do banco, o script `db/0001_leads.sql`.
3. O script dá ao `site_landing` apenas o INSERT das colunas do formulário: o site não lê, não altera e não apaga leads.
