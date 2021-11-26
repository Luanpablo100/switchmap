import { Patchport, PrismaClient } from ".prisma/client";

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
    newPort: async (portId: string, switchId: string, portDesc:string, departmentId: number, patchport: undefined)=> {
        await prisma.port.create({
            data: {
                code: portId,
                switchCode: switchId,
                desc: portDesc,
                departId: departmentId,
                patchport: patchport
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
    },
    newPatchPanel: async (patchCode: string, rackId: string) => {
        await prisma.patchpanel.create({
            data: {
                code: patchCode,
                rackCode: rackId
            }
        })
    },
    newPatchPort: async(portCode: string, switchPort: number, patchCode: string) => {
        await prisma.patchport.create({
            data: {
                pportcode: portCode,
                switchportId: switchPort,
                patchcode: patchCode
            }
        })

        .catch((e) => {
            throw e;
            })
        .finally(async () => {
        await prisma.$disconnect();
        });

    }
}

export default insertFunctions