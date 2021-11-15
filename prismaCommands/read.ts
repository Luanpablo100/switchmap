import { PrismaClient } from ".prisma/client";
import { query } from "express";

const prisma = new PrismaClient()

const readFunctions = {
    queryRack: {
        queryAll: async () => {
            const allRacks = await prisma.rack.findMany()
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

            return allRacks
        }
    },
    querySwitch: {
        queryAll: async () => {
            const allSwitchs = await prisma.switch.findMany({include:{ Ports:true }})
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });

            return allSwitchs
        }
    },
    queryPort: {
        queryAll: async () => {
            const allPorts = await prisma.port.findMany()
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
                
            return allPorts
        },
        queryFind: async (portId: number) => {
            const queryFindPorts = await prisma.port.findUnique({
                where: {
                    id: portId
                },
                include: {
                    department: true
                }
            })

            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

            return queryFindPorts
        }
    },
    queryDepartment: {
        queryAll: async () => {
            const allDepatments = await prisma.department.findMany()
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

            return allDepatments
        },
        queryFind: async () => {
            return "Apenas um departamento"
        }
    }
}

export default readFunctions