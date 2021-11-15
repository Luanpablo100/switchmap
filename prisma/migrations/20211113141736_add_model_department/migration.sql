/*
  Warnings:

  - You are about to drop the `department` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "department";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departName" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Port" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "switchCode" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    "departId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Port_switchCode_fkey" FOREIGN KEY ("switchCode") REFERENCES "Switch" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Port_departId_fkey" FOREIGN KEY ("departId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Port" ("code", "departId", "desc", "id", "switchCode") SELECT "code", "departId", "desc", "id", "switchCode" FROM "Port";
DROP TABLE "Port";
ALTER TABLE "new_Port" RENAME TO "Port";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
