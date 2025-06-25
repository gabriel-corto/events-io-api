/*
  Warnings:

  - You are about to drop the column `appliedAt` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `ticketsId` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ticket" INTEGER,
    "slug" TEXT,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "cover" TEXT,
    "date" DATETIME,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticketsId" INTEGER NOT NULL,
    CONSTRAINT "events_ticketsId_fkey" FOREIGN KEY ("ticketsId") REFERENCES "tickets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_events" ("cover", "date", "id", "location", "publishedAt", "slug", "ticket", "title") SELECT "cover", "date", "id", "location", "publishedAt", "slug", "ticket", "title" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");
CREATE TABLE "new_tickets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "applied_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_tickets" ("id", "location", "quantity", "slug") SELECT "id", "location", "quantity", "slug" FROM "tickets";
DROP TABLE "tickets";
ALTER TABLE "new_tickets" RENAME TO "tickets";
CREATE UNIQUE INDEX "tickets_slug_key" ON "tickets"("slug");
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    CONSTRAINT "users_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
