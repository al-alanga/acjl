-- ACJL initial data model (apply only after selecting/confirming the ACJL Supabase project)
-- Requests are private business/customer data. Do not enable public SELECT policies.
create extension if not exists pgcrypto;

create type public.request_status as enum (
  'received',
  'awaiting_information',
  'proposal_sent',
  'awaiting_payment',
  'paid',
  'in_progress',
  'awaiting_external',
  'completed',
  'cancelled'
);

create type public.service_modality as enum (
  'one_off',
  'monthly_specialist',
  'combined_one_off',
  'combined_monthly'
);

create table public.service_catalog (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  modality public.service_modality not null,
  short_description text not null,
  deliverables jsonb not null default '[]'::jsonb,
  exclusions jsonb not null default '[]'::jsonb,
  required_information jsonb not null default '[]'::jsonb,
  estimated_turnaround text,
  pricing_model text not null default 'quote',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.customer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  business_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_requests (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique,
  customer_id uuid references auth.users(id) on delete set null,
  service_id uuid references public.service_catalog(id) on delete set null,
  service_name_snapshot text not null,
  customer_name text not null,
  business_name text,
  email text not null,
  phone text not null,
  description text not null,
  status public.request_status not null default 'received',
  quoted_amount numeric(14,2),
  currency char(3) not null default 'MZN',
  assigned_to uuid references auth.users(id) on delete set null,
  requested_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.request_events (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.service_requests(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  previous_status public.request_status,
  new_status public.request_status,
  message text not null,
  internal_note boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.request_documents (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.service_requests(id) on delete cascade,
  uploaded_by uuid references auth.users(id) on delete set null,
  storage_path text not null unique,
  original_filename text not null,
  content_type text,
  byte_size bigint,
  created_at timestamptz not null default now()
);

create table public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.service_requests(id) on delete restrict,
  provider text not null,
  provider_reference text unique,
  amount numeric(14,2) not null check (amount > 0),
  currency char(3) not null default 'MZN',
  status text not null check (status in ('initiated','pending','confirmed','failed','reversed')),
  confirmed_at timestamptz,
  provider_payload jsonb,
  created_at timestamptz not null default now()
);

create index service_requests_customer_idx on public.service_requests(customer_id, requested_at desc);
create index service_requests_status_idx on public.service_requests(status, requested_at desc);
create index request_events_request_idx on public.request_events(request_id, created_at);
create index request_documents_request_idx on public.request_documents(request_id);
create index payment_transactions_request_idx on public.payment_transactions(request_id, created_at desc);

alter table public.service_catalog enable row level security;
alter table public.customer_profiles enable row level security;
alter table public.service_requests enable row level security;
alter table public.request_events enable row level security;
alter table public.request_documents enable row level security;
alter table public.payment_transactions enable row level security;

-- Public visitors may read published service listings only.
create policy "Public can view published services"
on public.service_catalog for select
using (published = true);

-- Customers may read/update only their own profile.
create policy "Customers read own profile"
on public.customer_profiles for select to authenticated
using (auth.uid() = id);
create policy "Customers update own profile"
on public.customer_profiles for update to authenticated
using (auth.uid() = id) with check (auth.uid() = id);
create policy "Customers insert own profile"
on public.customer_profiles for insert to authenticated
with check (auth.uid() = id);

-- Customers may read only their own requests and public event/document metadata.
-- Writes and staff-only operations remain server-side; service-role secrets never reach the browser.
create policy "Customers read own service requests"
on public.service_requests for select to authenticated
using (auth.uid() = customer_id);

create policy "Customers read public events for own requests"
on public.request_events for select to authenticated
using (
  internal_note = false
  and exists (
    select 1 from public.service_requests r
    where r.id = request_id and r.customer_id = auth.uid()
  )
);

create policy "Customers read own request document metadata"
on public.request_documents for select to authenticated
using (
  exists (
    select 1 from public.service_requests r
    where r.id = request_id and r.customer_id = auth.uid()
  )
);

-- No client-facing policies are granted for payment_transactions or staff-only
-- updates. Keep writes and privileged operations on trusted server-side routes.
