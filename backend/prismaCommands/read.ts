import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

const readFunctions = {
    queryRack: {
        queryAll: async () => {
            const allRacks = await prisma.rack.findMany()
        }
    },
    querySwitch: {
        queryAll: async () => {
            const allSwitchs = await prisma.switch.findMany()
        }
    },
    queryPort: {
        queryAll: async () => {
            const allPorts = await prisma.port.findMany()
        }
    },
}

export default readFunctions