create extension if not exists vector;
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