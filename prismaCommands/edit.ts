import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

const editFunctions = {
    editPort: async (portId: number, portCode: string, portDesc: string, departmentId: number) => {
        await prisma.port.update({
            where: {
                id: portId
            },
            data: {
                code: portCode,
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
    }
}

export default editFunctions