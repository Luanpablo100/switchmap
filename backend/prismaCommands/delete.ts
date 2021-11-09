import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient()

const deleteFunctions = {
    deletePort: async(portId: number) => {
        await prisma.port.delete({
            where: {
                id: portId
            }
        })
    }
}

export default deleteFunctions