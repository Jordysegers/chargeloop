-- ChargeLoop partnerportaal: eenmalig uitvoeren in Supabase (SQL Editor > New query > plak > Run)
-- Let op: dit staat bewust NIET in de tabel "kv", want die is voor iedereen leesbaar.

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  share_pct numeric(5,2) not null default 20 check (share_pct >= 0 and share_pct <= 100),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists partners_email_uq on public.partners (lower(email));

create table if not exists public.partner_readers (
  reader_id text primary key,                 -- Stripe terminal, begint met tmr_
  partner_id uuid not null references public.partners(id) on delete cascade,
  label text not null default ''
);
create index if not exists partner_readers_partner_idx on public.partner_readers (partner_id);

alter table public.partners enable row level security;
alter table public.partner_readers enable row level security;

drop policy if exists "beheerder beheert partners" on public.partners;
drop policy if exists "partner leest eigen gegevens" on public.partners;
drop policy if exists "beheerder beheert terminals" on public.partner_readers;
drop policy if exists "partner leest eigen terminals" on public.partner_readers;

-- Alleen de beheerder mag alles
create policy "beheerder beheert partners" on public.partners
  for all to authenticated
  using ((auth.jwt() ->> 'email') = 'jordysegers@hotmail.com')
  with check ((auth.jwt() ->> 'email') = 'jordysegers@hotmail.com');

create policy "beheerder beheert terminals" on public.partner_readers
  for all to authenticated
  using ((auth.jwt() ->> 'email') = 'jordysegers@hotmail.com')
  with check ((auth.jwt() ->> 'email') = 'jordysegers@hotmail.com');

-- Een partner leest alleen de eigen regel en de eigen terminals (op basis van het ingelogde e-mailadres)
create policy "partner leest eigen gegevens" on public.partners
  for select to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

create policy "partner leest eigen terminals" on public.partner_readers
  for select to authenticated
  using (partner_id in (select id from public.partners where lower(email) = lower(auth.jwt() ->> 'email')));

-- Bezoekers zonder inlog (anon) hebben geen enkele toegang tot deze tabellen.
revoke all on public.partners from anon;
revoke all on public.partner_readers from anon;
