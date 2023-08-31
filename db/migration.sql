BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

DROP TABLE IF EXISTS "user", "website";

CREATE TABLE "user" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "hash" TEXT NOT NULL
);

CREATE TABLE "website" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "slug" TEXT NOT NULL UNIQUE,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "address" TEXT NOT NULL,
  "device" TEXT,
  "level" TEXT,
  "user_id" INTEGER REFERENCES "user"("id")
);

COMMIT;