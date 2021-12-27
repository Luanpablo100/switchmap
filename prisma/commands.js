import prisma from "../prisma/lib/prisma";

const prismaExecute = {
    read: {
        hack: {
            all: async () => {
                const allRacks = await prisma.hack.findMany({
                    include: {
                        Switchs: {
                            include: {
                                Ports: true,
                            },
                            orderBy: {
                                code: 'asc',
                            }
                        },
                    },
                })
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
    
                return allRacks
            },
            unique: async (rackId) => {
                const findedHack = prisma.hack.findUnique({
                    where: {
                        id: rackId
                    }
                })

                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });

                return findedHack
            }
        },
        switch: {
            all: async () => {
                const allSwitchs = await prisma.switch.findMany(
                    {
                        orderBy: {
                            code: 'asc'
                        },
                        include:{ Ports:true }
                    }
                )
                    .catch((e) => {
                        throw e;
                        })
                    .finally(async () => {
                    await prisma.$disconnect();
                    });
    
                return allSwitchs
            },
            unique: async (switchId) => {
                const queryFindSwitch = await prisma.switch.findUnique({
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
    
                return queryFindSwitch
            },
            fromHack: async(hackId) => {
                const switchs = await prisma.switch.findMany({
                    where: {
                        rackCode: hackId
                    }
                })
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
                return switchs
            }
        },
        port: {
            all: async () => {
                const allPorts = await prisma.port.findMany()
                    .catch((e) => {
                        throw e;
                        })
                    .finally(async () => {
                    await prisma.$disconnect();
                    });
                    
                return allPorts
            },
            unique: async (portId) => {
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
        department: {
            all: async () => {
                const allDepatments = await prisma.department.findMany(
                    {
                        orderBy: {
                            departName: 'asc'
                        }
                    }
                )
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
    
                return allDepatments
            },
            unique: async (departId) => {
                const queryFindDepartments = await prisma.department.findUnique({
                    where: {
                        id: departId
                    },
                    include: {
                        Ports: true
                    }
                })
    
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
    
                return queryFindDepartments
            }
        },
    },
    insert: {
        hack: async(rackId) => {
            await prisma.hack.create({
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
        switch: async(switchCode, rackId) => {
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
        port: async (portId, switchId, portDesc, departmentId, patchportdesc)=> {
            await prisma.port.create({
                data: {
                    code: portId,
                    switchCode: switchId,
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
        department: async (name, color) => {
            await prisma.department.create({
                data: {
                    departName: name,
                    color: color
                }
            })
        },
    },
    update: {
        port: async (portId, portCode, portDesc, departmentId, patchportdesc) => {
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
        switch: async (switchid, switchcode) => {
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
        department: async (departId, departName, color) => {
            await prisma.department.update({
                where: {
                    id: departId
                },
                data: {
                    departName: departName,
                    color: color
                }
            })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
        },
        hack: async(hackId, hackCodename) => {
            await prisma.hack.update({
                where: {
                    id: hackId
                },
                data: {
                    code: hackCodename
                }
            })
        }
    },
    delete: {
        port: async(portId) => {
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
        switch: async (switchId) => {
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
        department: async (departId) => {
            await prisma.department.delete({
                where: {
                    id: departId
                }
            })
    
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
        },
        hack: async(hackId) => {
            await prisma.hack.delete({
                where: {
                    id: hackId
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
}

export default prismaExecute