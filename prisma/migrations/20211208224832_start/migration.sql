-- CreateTable
CREATE TABLE "Rack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Switch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "rackCode" TEXT NOT NULL DEFAULT '1',
    CONSTRAINT "Switch_rackCode_fkey" FOREIGN KEY ("rackCode") REFERENCES "Rack" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Port" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "switchCode" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    "departId" INTEGER NOT NULL,
    "patchportdesc" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Port_switchCode_fkey" FOREIGN KEY ("switchCode") REFERENCES "Switch" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Port_departId_fkey" FOREIGN KEY ("departId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Rack_code_key" ON "Rack"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Switch_code_key" ON "Switch"("code");
