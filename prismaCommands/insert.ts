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
    newPort: async (portId: string, switchId: string, portDesc:string, departmentId: number)=> {
        await prisma.port.create({
            data: {
                code: portId,
                switchCode: switchId,
                desc: portDesc,
                departId: departmentId
            }
        })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
    },
    newDepartment: async (name: string) => {
        await prisma.department.create({
            data: {
                departName: name
            }
        })
    }
}

export default insertFunctions