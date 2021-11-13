import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

const insertFunctions = {
    newRack: async(rackId: string) => {
        await prisma.rack.create({
            data: {
                code: rackId
            }
        })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

    },
    newSwitch: async(switchCode: string, rackId:string) => {
        await prisma.switch.create({
            data: {
                code: switchCode,
                rackCode: rackId
            }
        })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
    },
    newPort: async (portId: string, switchId: string, portDesc:string)=> {
        await prisma.port.create({
            data: {
                code: portId,
                switchCode: switchId,
                desc: portDesc
            }
        })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
    },
}

export default insertFunctions