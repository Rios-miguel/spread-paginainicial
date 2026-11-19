# Site spread.app.br: correções de segurança

**Data:** 06/11/2026
**Origem:** relatório de auditoria de terceiros (`RELATORIO_AUDITORIA_SEGURANCA.md`, modelo Dolphin3-Cyber-8B)
**Commit:** `865bd92`, no clone local de `Rios-miguel/spread-paginainicial`, em cima de `1719a1b`

Cada item do relatório foi conferido contra o código atual do site. Alguns procediam e foram implementados (às vezes de outro jeito). Outros já estavam cobertos ou não compensavam.

## Resumo

| # | Item do relatório | Severidade dada | Decisão |
|---|---|---|---|
| 1 | Falta de limite de envios (flood no formulário) | Alta | **Implementado** (por IP e global) |
| 2 | Pool do PostgreSQL pode se esgotar | Média | **Implementado** (limites de tempo) |
| 3 | Validação fraca de e-mail / quebra de linha em cabeçalho | Média | Já estava coberto. Só acrescentei a remoção de caracteres de controle |
| 4 | Risco de ReDoS na expressão regular | Baixa | Não se aplica |
| 5 | Honeypot por tempo de preenchimento | Média | Não implementado (de propósito) |
| 6 | Faltam cabeçalhos HTTP de segurança | Alta | **Implementado** em parte (o Caddy já mandava alguns) |

## O que mudou

### 1. Limite de envios do formulário (`src/lib/ratelimit.ts`, `src/app/actions.ts`)

- **Por IP:** 5 envios a cada 10 minutos.
- **Global:** 60 envios por hora no site inteiro. Esse teto protege a cota grátis do Brevo (300 e-mails por dia) e o banco mesmo quando o flood vem de muitos IPs ao mesmo tempo, coisa que um limite só por IP não segura.
- A conferência roda antes do honeypot, da validação, do banco e do Brevo.
- **De onde vem o IP:** do cabeçalho `CF-Connecting-IP`. Ele é confiável porque o grupo de segurança só aceita conexões nas portas 80 e 443 vindas das faixas da Cloudflare, e a Cloudflare sempre sobrescreve esse cabeçalho. Sem ele, o código usa o último valor de `X-Forwarded-For`.
- **Memória:** a contagem fica na memória do processo (o site roda num processo só). A lista guarda no máximo 10 mil IPs. Quando enche, as entradas vencidas são apagadas. Se continuar cheia, o envio é recusado.
- Quem passa do limite vê: "Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo."
- Esse limite se soma à regra da Cloudflare (100 pedidos a cada 10 s por IP), que é larga demais para um formulário.

Diferença em relação à sugestão do relatório: o relatório limitava só por IP e deixava a lista de IPs crescer sem fim.

### 2. Pool do PostgreSQL (`src/lib/db.ts`)

```ts
max: 3,
connectionTimeoutMillis: 3_000, // espera por uma conexão livre
idleTimeoutMillis: 10_000,
statement_timeout: 5_000,       // limite do lado do Postgres
query_timeout: 6_000,           // limite do lado do cliente
```

Com só 3 conexões, uma conexão presa já pesa. Com esses limites, nenhum pedido fica parado ocupando o pool.

### 3. Entrada do formulário (`src/lib/lead.ts`)

- Agora o código remove caracteres de controle (`U+0000` a `U+001F` e `U+007F` a `U+009F`) de nome, e-mail e empresa.
- O resto já estava coberto e não mudou:
  - A expressão regular do e-mail (`[^@\s]+@[^@\s]+\.[^@\s]{2,}`) recusa espaços e quebras de linha (CR e LF).
  - Nome e empresa já trocam qualquer sequência de espaços por um espaço simples.
  - O aviso de lead vai pela **API HTTP do Brevo em JSON**, não por cabeçalho SMTP montado à mão. Por isso a injeção de CRLF no `Reply-To` não se aplica.
- O pacote `validator` não foi adicionado: não haveria ganho real e seria uma dependência a mais.

### 6. Cabeçalhos HTTP (`next.config.ts`)

O Caddy já mandava HSTS, `X-Content-Type-Options: nosniff` e `X-Frame-Options: DENY`, e escondia `Server` e `X-Powered-By`. O que entrou no Next:

- `Content-Security-Policy` (sem nonce, no modelo do guia do Next 16 para páginas pré-renderizadas):
  ```
  default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; object-src 'none';
  base-uri 'self'; form-action 'self'; frame-ancestors 'none'
  ```
  Em desenvolvimento, `script-src` ganha também `'unsafe-eval'`, que o React exige nesse modo.
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`
- `X-Frame-Options` e `nosniff` também no Next, como segunda camada caso o site rode sem o Caddy.
- `poweredByHeader: false`

Diferenças em relação à sugestão do relatório:
- **HSTS sem `preload`.** O preload põe o domínio numa lista embutida nos navegadores, e sair dela leva meses. O HSTS continua vindo do Caddy.
- **Sem `api.brevo.com` no `connect-src`.** O Brevo só é chamado pelo servidor, então o navegador nunca fala com ele.
- **Sem nonce no `script-src`.** O nonce obrigaria renderizar a página a cada pedido e acabaria com a pré-renderização. Como tudo é servido do próprio domínio (fontes via `next/font`, nada de script, imagem ou API de fora), o ganho seria pequeno.

## O que não foi implementado e por quê

- **Item 4, ReDoS:** o tamanho máximo do e-mail (254 caracteres) é conferido antes da expressão regular rodar. Com esse teto, o pior caso de retrocesso da regex é irrelevante.
- **Item 5, honeypot por tempo:** o horário de início seria mandado pelo próprio navegador, então um robô forja sem esforço. Além disso, quem enviasse muito rápido, como alguém usando o preenchimento automático do navegador, receberia um "sucesso" falso e o contato se perderia sem ninguém saber. Perder um lead real custa mais do que o ganho, e o limite de envios do item 1 já cobre o flood. O honeypot original (campo `website` invisível) continua como estava.

## Testes

- `tsc`, `eslint` e `next build` passaram sem erro.
- Com `next start` local:
  - Os cabeçalhos aparecem em `/` e em `/login` (conferido com `curl -I`).
  - A página carrega com fontes e estilos normais, sem nenhum bloqueio da CSP no console do navegador.
  - Seis envios seguidos do formulário: do 1º ao 5º deram o erro de banco (esperado, sem banco ligado localmente) e o 6º foi barrado pelo limite.

## Deploy e ajuste no Caddy (06/11/2026)

- O commit `865bd92` foi publicado em `/opt/spread/site` com `git archive` e `docker compose up -d --build site`. A pasta anterior ficou guardada em `/opt/spread/site-bak-20261106.tgz`.
- **Problema encontrado:** o bloco `(seguranca)` do Caddyfile, que vale para o domínio inteiro, fixava uma CSP mínima (`frame-ancestors 'none'; base-uri 'self'; object-src 'none'`) e uma Permissions-Policy própria. As duas substituíam os cabeçalhos do Next.
- **Correção:** as duas linhas ganharam o prefixo `?` (`?Content-Security-Policy`, `?Permissions-Policy`). Com isso, o Caddy só escreve esses cabeçalhos quando o serviço de trás não mandou os seus. O site passa a sair com a CSP completa. O Travel Rule (`/travelrule`, `/travelrule-homologacao`) e o redirecionamento do `www` continuam com a mínima. Cópia do arquivo anterior: `/opt/spread/Caddyfile.bak-csp-site`.
- **Detalhe de operação:** o Caddyfile é montado no contêiner como arquivo único. Um `sed -i` cria um arquivo novo (outro inode), que o contêiner não enxerga. Depois de editar com `sed -i`, é preciso rodar `docker compose restart caddy`, porque um `caddy reload` sozinho continua lendo o arquivo antigo.
- **Conferido em produção** (`curl -I`):
  - `/` e `/login` saem com a CSP completa, a Permissions-Policy do Next, HSTS e `X-Frame-Options: DENY`.
  - `/travelrule/`, `/travelrule-homologacao/` e `www` saem com a CSP mínima do Caddy.

## Arquivos

```
next.config.ts       | 32 +++++++++++-
src/app/actions.ts   |  7 +++
src/lib/db.ts        | 12 +++++-
src/lib/lead.ts      |  7 +++
src/lib/ratelimit.ts | 61 +++++++++++++++++++++ (novo)
```
