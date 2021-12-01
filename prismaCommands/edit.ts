import prisma from "../prisma/lib/prisma";

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
    },
    editSwitch: async (switchid: number, switchcode:string) => {
        await prisma.switch.update({
            where: {
                id:switchid,
            },
            data: {
                code: switchcode
            }
        })

        .catch((e) => {
            throw e;
            })
        .finally(async () => {
        await prisma.$disconnect();
        });
    },
    editDepartment: async (departId:number, departName: string) => {
        await prisma.department.update({
            where: {
                id: departId
            },
            data: {
                departName: departName
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