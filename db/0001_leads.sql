-- Leads da landing page da Spread, no PostgreSQL da Spread.
-- O site entra com o usuário site_landing, que só pode INSERIR nesta tabela, nunca ler, alterar ou apagar.
-- Rode como dono do banco "site" (psql -d site -f db/0001_leads.sql).

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(btrim(name)) between 2 and 120),
  email       text not null check (
                char_length(email) <= 254
                and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
              ),
  company     text not null check (char_length(btrim(company)) between 2 and 160),
  source      text not null default 'landing' check (char_length(source) <= 60),
  status      text not null default 'novo' check (status in ('novo', 'contatado', 'demo_agendada', 'descartado'))
);

-- Um lead por e-mail (lower(email): insensível a maiúsculas/minúsculas)
create unique index if not exists leads_email_key on public.leads (lower(email));
create index if not exists leads_created_at_idx on public.leads (created_at desc);

comment on table public.leads is 'Leads da landing page (nome, e-mail corporativo, empresa). O site só insere; leitura só pelo dono do banco.';

-- ---------------------------------------------------------------------------
-- Segurança: privilégios mínimos para o usuário do site
-- ---------------------------------------------------------------------------
revoke all on schema public from public;
revoke all on table public.leads from public;
grant usage on schema public to site_landing;
-- só o INSERT das colunas que o formulário envia (id, created_at e status não são graváveis)
grant insert (name, email, company, source) on table public.leads to site_landing;
