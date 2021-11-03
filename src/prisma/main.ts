import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

import insertFunctions from "./insert";

import readFunctions from "./read";

console.log(readFunctions.queryRack.queryAll())