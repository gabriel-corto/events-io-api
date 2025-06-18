/*
  Warnings:

  - You are about to drop the column `hour` on the `events` table. All the data in the column will be lost.

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
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_events" ("cover", "date", "id", "location", "publishedAt", "slug", "ticket", "title") SELECT "cover", "date", "id", "location", "publishedAt", "slug", "ticket", "title" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
