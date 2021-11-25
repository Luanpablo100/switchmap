-- CreateTable
CREATE TABLE "Patchpanel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "rackCode" TEXT NOT NULL DEFAULT '1',
    CONSTRAINT "Patchpanel_rackCode_fkey" FOREIGN KEY ("rackCode") REFERENCES "Rack" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Patchport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "panelCode" TEXT NOT NULL,
    CONSTRAINT "Patchport_panelCode_fkey" FOREIGN KEY ("panelCode") REFERENCES "Patchpanel" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Switch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "rackCode" TEXT NOT NULL DEFAULT '1',
    CONSTRAINT "Switch_rackCode_fkey" FOREIGN KEY ("rackCode") REFERENCES "Rack" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Switch" ("code", "id", "rackCode") SELECT "code", "id", "rackCode" FROM "Switch";
DROP TABLE "Switch";
ALTER TABLE "new_Switch" RENAME TO "Switch";
CREATE UNIQUE INDEX "Switch_code_key" ON "Switch"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Patchpanel_code_key" ON "Patchpanel"("code");
