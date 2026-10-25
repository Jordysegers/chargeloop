-- ChargeLoop: eenmalig uitvoeren in Supabase (SQL Editor > New query > plak > Run)
create table if not exists public.kv (
  collection text not null,
  id text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);
alter table public.kv enable row level security;

drop policy if exists "iedereen leest (behalve berichten)" on public.kv;
drop policy if exists "iedereen mag een bericht sturen" on public.kv;
drop policy if exists "beheerder mag alles" on public.kv;

-- Bezoekers lezen stations, FAQ, instellingen en foto's. Berichten (leads) zijn niet leesbaar.
create policy "iedereen leest (behalve berichten)" on public.kv
  for select to anon, authenticated using (collection <> 'leads');

-- Bezoekers mogen alleen een nieuw bericht toevoegen
create policy "iedereen mag een bericht sturen" on public.kv
  for insert to anon, authenticated with check (collection = 'leads');

-- Alleen de beheerder mag lezen, wijzigen en verwijderen
create policy "beheerder mag alles" on public.kv
  for all to authenticated
  using ((auth.jwt() ->> 'email') = 'jordysegers@hotmail.com')
  with check ((auth.jwt() ->> 'email') = 'jordysegers@hotmail.com');
