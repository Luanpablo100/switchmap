/*
  Warnings:

  - You are about to alter the column `switchCode` on the `Port` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- DropIndex
DROP INDEX "Switch_code_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Port" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "switchCode" INTEGER NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    "departId" INTEGER NOT NULL,
    "patchportdesc" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Port_switchCode_fkey" FOREIGN KEY ("switchCode") REFERENCES "Switch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Port_departId_fkey" FOREIGN KEY ("departId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Port" ("code", "departId", "desc", "id", "patchportdesc", "switchCode") SELECT "code", "departId", "desc", "id", "patchportdesc", "switchCode" FROM "Port";
DROP TABLE "Port";
ALTER TABLE "new_Port" RENAME TO "Port";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
