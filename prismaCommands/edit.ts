import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

const editFunctions = {
    editPort: async (portId: number, portCode: string, portDesc: string, departmentId: number, patchportdesc: string) => {
        await prisma.port.update({
            where: {
                id: portId
            },
            data: {
                code: portCode,
                desc: portDesc,
                departId: departmentId,
                patchportdesc: patchportdesc
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