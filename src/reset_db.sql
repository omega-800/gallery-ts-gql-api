\c gallery;
drop schema public cascade;
create schema public;
grant usage on schema public to public;
grant create on schema public to public;
grant usage on schema public to gallery;
grant create on schema public to gallery;
create extension "uuid-ossp";