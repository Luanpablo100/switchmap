import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

const readFunctions = {
    queryRack: {
        queryAll: async () => {
            const allRacks = await prisma.rack.findMany()
            return allRacks
        }
    },
    querySwitch: {
        queryAll: async () => {
            const allSwitchs = await prisma.switch.findMany({include:{ Ports:true }})
            return allSwitchs
        }
    },
    queryPort: {
        queryAll: async () => {
            const allPorts = await prisma.port.findMany()
            return allPorts
        },
        queryFind: async (portId: number) => {
            const queryFindPorts = await prisma.port.findUnique({
                where: {
                    id: portId
                }
            })
            return queryFindPorts
        }
    },
}

export default readFunctions