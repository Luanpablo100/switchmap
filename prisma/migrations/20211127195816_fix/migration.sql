/*
  Warnings:

  - You are about to drop the column `pportcode` on the `Patchport` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patchport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patchcode" TEXT NOT NULL,
    "switchportId" INTEGER NOT NULL,
    CONSTRAINT "Patchport_patchcode_fkey" FOREIGN KEY ("patchcode") REFERENCES "Patchpanel" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Patchport_switchportId_fkey" FOREIGN KEY ("switchportId") REFERENCES "Port" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patchport" ("id", "patchcode", "switchportId") SELECT "id", "patchcode", "switchportId" FROM "Patchport";
DROP TABLE "Patchport";
ALTER TABLE "new_Patchport" RENAME TO "Patchport";
CREATE UNIQUE INDEX "Patchport_switchportId_key" ON "Patchport"("switchportId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
