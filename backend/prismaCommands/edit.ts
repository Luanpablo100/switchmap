import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

const editFunctions = {
    editPort: async (portId: number, portCode: string, portDesc: string) => {
        await prisma.port.update({
            where: {
                id: portId
            },
            data: {
                code: portCode,
                desc: portDesc,
            }
        })
    }
}

export default editFunctions