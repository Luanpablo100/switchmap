import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

const insertFunctions = {
    newRack: async(rackId: string) => {
        await prisma.rack.create({
            data: {
                code: rackId
            }
        })
    },
    newSwitch: async(switchCode: string, rackId:string) => {
        await prisma.switch.create({
            data: {
                code: switchCode,
                rackCode: rackId
            }
        })
    },
    newPort: async (portId: string, switchId: string)=> {
        await prisma.port.create({
            data: {
                code: portId,
                switchCode: switchId
            }
        })
    },
}

export default insertFunctions