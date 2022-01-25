import prisma from "../lib/prisma";

const prismaExecute = {
    read: {
        hack: {
            all: async () => {
                const allRacks = await prisma.hack.findMany()
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
    
                return allRacks
            },
            allWithContent: async () => {
                const allRacksWithContent = await prisma.hack.findMany({
                    include: {
                        Switchs: {
                            include: {
                                Ports: true,
                            },
                            orderBy: {
                                codename: 'asc',
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
    
                return allRacksWithContent
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
                            codename: 'asc'
                        },
                        include: {
                            Ports: true
                        }
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
            search: async (value, hack) => {
                const search  = await prisma.hack.findMany({
                    include: {
                        Switchs: {
                            include: {
                                Ports: {
                                    where: {
                                        desc: {
                                            contains: value
                                        },
                                    }
                                }
                            },
                            orderBy: {
                                codename: 'asc',
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

                return search
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
                            codename: 'asc'
                        },
                        include: {
                            group: true
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
        group: {
            all: async () => {
                const allGroups = await prisma.group.findMany()

                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
    
                return allGroups
            },
            unique: async(groupId) => {
                const findGroup = await prisma.group.findUnique({
                    where: {
                        id: groupId
                    }
                })
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
    
                return findGroup
            }
        },
        switchType: {
            all: async () => {
                const allTypes = await prisma.switchType.findMany()
                
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
    
                return allTypes
            },
            unique: async(typeId) => {
                const findType = await prisma.switchType.findUnique({
                    where: {
                        id: typeId
                    }
                })
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
    
                return findType

            }
        }
    },
    insert: {
        hack: async(rackCodename) => {
            await prisma.hack.create({
                data: {
                    codename: rackCodename
                }
            })
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
    
        },
        switch: async(switchCode, rackId, swTypeId) => {
            await prisma.switch.create({
                data: {
                    codename: switchCode,
                    rackCode: rackId,
                    typeId: swTypeId
                }
            })
                .catch((e) => {
                    throw e;
                    })
                .finally(async () => {
                await prisma.$disconnect();
                });
        },
        port: async (portCode, switchCode, portDesc, departmentId, patchportdesc) => {
            await prisma.port.create({
                data: {
                    codename: portCode,
                    switchCode: switchCode,
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
        department: async (name, groupId, hackId, isRestricted) => {
            await prisma.department.create({
                data: {
                    codename: name,
                    groupId: groupId,
                    hackId: hackId,
                    isRestricted: isRestricted
                }
            })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
        },
        group: async (name, color) => {
            await prisma.group.create({
                data: {
                    codename: name,
                    color: color,
                }
            })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
        },
        switchType: async(name, color1, color2, color3, color4, color5) => {
            await prisma.switchType.create({
                data: {
                    codename: name,
                    color1: color1,
                    color2: color2,
                    color3: color3,
                    color4: color4,
                    color5: color5
                }
            })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            })
        }
    },
    update: {
        port: async (portId, portCode, portDesc, departmentId, patchportdesc) => {
            await prisma.port.update({
                where: {
                    id: portId
                },
                data: {
                    codename: portCode,
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
        switch: async (switchid, switchcode, swTypeId) => {
            await prisma.switch.update({
                where: {
                    id:switchid,
                },
                data: {
                    codename: switchcode,
                    typeId: swTypeId
                }
            })
    
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
        },
        department: async (departId, departName, groupId, isRestricted, hackId) => {
            await prisma.department.update({
                where: {
                    id: departId
                },
                data: {
                    codename: departName,
                    groupId: groupId,
                    isRestricted: isRestricted,
                    hackId: hackId
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
                    codename: hackCodename
                }
            })
        },
        group:  async(groupId, groupName, groupColor) => {
            await prisma.group.update({
                where: {
                    id: groupId
                },
                data: {
                    codename: groupName,
                    color: groupColor
                }
            })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
        },
        switchType: async(typeId, name, color1, color2, color3, color4, color5) => {
            await prisma.switchType.update({
                where: {
                    id: typeId
                },
                data: {
                    codename: name,
                    color1: color1,
                    color2: color2,
                    color3: color3,
                    color4: color4,
                    color5: color5
                }
            })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
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
            await prisma.port.deleteMany({
                where: {
                    switchCode: switchId
                },
            })

            .catch((e) => {
                throw e;
            })
            .finally(async () => {
            // await prisma.$disconnect();
            
                await prisma.switch.delete({
                    where: {
                        id: switchId
                    }
                })
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
        },
        group: async(groupId)=> {
            await prisma.group.delete({
                where: {
                    id: groupId
                }
            })
            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });
        },
        switchType: async(typeId) => {
            await prisma.switchType.delete({
                where: {
                    id: typeId
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