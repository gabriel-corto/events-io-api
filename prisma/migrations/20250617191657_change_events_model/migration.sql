-- AlterTable
ALTER TABLE "events" ADD COLUMN "cover" TEXT;
ALTER TABLE "events" ADD COLUMN "date" DATETIME;
ALTER TABLE "events" ADD COLUMN "hour" DATETIME;

-- CreateTable
CREATE TABLE "tickets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "appliedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_slug_key" ON "tickets"("slug");
