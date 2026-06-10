-- Incrément atomique du compteur d'usage mensuel.
-- À exécuter une fois dans le SQL Editor Supabase (projet descri-app).
-- Tant que cette fonction n'existe pas, le code retombe sur un
-- fallback lecture+écriture (fonctionnel mais non atomique).

create or replace function public.increment_usage(
  p_user_id uuid,
  p_month text,
  p_count int
)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.usage (user_id, month, descriptions_count)
  values (p_user_id, p_month, p_count)
  on conflict (user_id, month)
  do update set descriptions_count = public.usage.descriptions_count + p_count;
$$;
