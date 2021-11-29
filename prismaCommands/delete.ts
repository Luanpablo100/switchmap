import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

const deleteFunctions = {
    deletePort: async(portId: number) => {
        await prisma.port.delete({
            where: {
                id: portId
            }
        })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
    },
    deleteSwitch: async (switchId:number) => {
        await prisma.switch.delete({
            where: {
                id: switchId
            }
        })

        .catch((e) => {
            throw e;
            })
        .finally(async () => {
        await prisma.$disconnect();
        });
    },
    deleteDepartment: async (departId:number) => {
        await prisma.department.delete({
            where: {
                departId: departId
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

export default deleteFunctions