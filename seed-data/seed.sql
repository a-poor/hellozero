CREATE DATABASE zstart;
CREATE DATABASE zstart_cvr;
CREATE DATABASE zstart_cdb;

\c zstart;

CREATE TABLE "user" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "role" TEXT
);

CREATE TABLE "task" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "status" TEXT,
  "createdById" TEXT REFERENCES "user"("id"),
  "assignedToId" TEXT REFERENCES "user"("id")
);


INSERT INTO "user" ("id", "name", "role") VALUES 
  ('u001', 'Alice', 'user'),
  ('u002', 'Bob', 'user'),
  ('u003', 'Carl', 'admin');

INSERT INTO "task" (id, name, status, "createdById", "assignedToId") VALUES
  ('t001', 'Get milk', 'done', 'u001', 'u001'),
  ('t002', 'Get cookies', 'in-progress', 'u001', 'u001'),
  ('t003', 'Walk the dog', 'in-progress', 'u002', 'u002'),
  ('t004', 'Buy movie tickets', 'not-started', 'u002', 'u001');
