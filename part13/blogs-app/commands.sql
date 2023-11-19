CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

\d

\d blogs;

insert into blogs (author, url, title) values ('Dan Abramov', 'let-vs-const', 'On let vs const');
insert into blogs (author, url, title) values ('Lauren Albe', 'gaps-postgres', 'Gaps in sequences in PostgreSQL');

select * from blogs;