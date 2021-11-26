-- CreateTable
CREATE TABLE "Patchpanel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "rackCode" TEXT NOT NULL,
    CONSTRAINT "Patchpanel_rackCode_fkey" FOREIGN KEY ("rackCode") REFERENCES "Rack" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Patchport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pportcode" TEXT NOT NULL,
    "patchcode" TEXT NOT NULL,
    "switchportId" INTEGER NOT NULL,
    CONSTRAINT "Patchport_patchcode_fkey" FOREIGN KEY ("patchcode") REFERENCES "Patchpanel" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Patchport_switchportId_fkey" FOREIGN KEY ("switchportId") REFERENCES "Port" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Patchpanel_code_key" ON "Patchpanel"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Patchport_switchportId_key" ON "Patchport"("switchportId");
