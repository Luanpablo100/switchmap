-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departName" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL DEFAULT 1,
    "hackId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Department_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Department_hackId_fkey" FOREIGN KEY ("hackId") REFERENCES "Hack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Department" ("departName", "groupId", "id") SELECT "departName", "groupId", "id" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
