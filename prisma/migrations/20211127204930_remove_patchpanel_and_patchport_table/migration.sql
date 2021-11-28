/*
  Warnings:

  - You are about to drop the `Patchpanel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patchport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Patchpanel_code_key";

-- DropIndex
DROP INDEX "Patchport_switchportId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Patchpanel";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Patchport";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Port" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "switchCode" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    "departId" INTEGER NOT NULL DEFAULT 0,
    "patchportdesc" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Port_switchCode_fkey" FOREIGN KEY ("switchCode") REFERENCES "Switch" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Port_departId_fkey" FOREIGN KEY ("departId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Port" ("code", "departId", "desc", "id", "switchCode") SELECT "code", "departId", "desc", "id", "switchCode" FROM "Port";
DROP TABLE "Port";
ALTER TABLE "new_Port" RENAME TO "Port";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
