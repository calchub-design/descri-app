-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Subscriptions table
create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  plan text not null default 'free',
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'active',
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Usage table (per user per month)
create table if not exists public.usage (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  month text not null,
  descriptions_count integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, month)
);

-- RLS policies
alter table public.subscriptions enable row level security;
alter table public.usage enable row level security;

-- Users can read their own subscription
create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Users can read their own usage
create policy "Users can view own usage"
  on public.usage for select
  using (auth.uid() = user_id);

-- Service role can do everything (used by API routes via service key)
create policy "Service role full access subscriptions"
  on public.subscriptions for all
  using (true)
  with check (true);

create policy "Service role full access usage"
  on public.usage for all
  using (true)
  with check (true);

-- Function to auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function update_updated_at();

create trigger update_usage_updated_at
  before update on public.usage
  for each row execute function update_updated_at();

-- Index for fast lookups
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_usage_user_month on public.usage(user_id, month);
