create extension if not exists vector;

create table admin_settings (
  id uuid primary key default gen_random_uuid(),
  system_prompt text not null,
  allowlisted_channels text[] not null,
  updated_at timestamp default now()
);

insert into admin_settings (system_prompt, allowlisted_channels)
values ('You are a helpful Discord copilot.', '{}');

create table conversation_state (
  id int primary key default 1,
  summary text default ''
);

insert into conversation_state (id, summary) values (1, '');

create table document_chunks (
  id uuid primary key default gen_random_uuid(),
  content text,
  embedding vector(1536)
);
