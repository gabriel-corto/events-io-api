/*
  Warnings:

  - You are about to drop the column `location` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `eventsId` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tickets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT,
    "eventsId" INTEGER NOT NULL,
    "applied_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tickets_eventsId_fkey" FOREIGN KEY ("eventsId") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tickets" ("applied_at", "id", "slug") SELECT "applied_at", "id", "slug" FROM "tickets";
DROP TABLE "tickets";
ALTER TABLE "new_tickets" RENAME TO "tickets";
CREATE UNIQUE INDEX "tickets_slug_key" ON "tickets"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
