-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Port" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "switchCode" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Port_switchCode_fkey" FOREIGN KEY ("switchCode") REFERENCES "Switch" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Port" ("code", "id", "switchCode") SELECT "code", "id", "switchCode" FROM "Port";
DROP TABLE "Port";
ALTER TABLE "new_Port" RENAME TO "Port";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
