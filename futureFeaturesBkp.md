## Patch panel and Patch ports

### Server.ts
 

app.get('/patchpanel', async(request, response) => {
  try {
    const allPatchPanels = await readFunctions.queryPatchPanel.queryAll()
    return response.status(200).json(allPatchPanels)
  } catch (error) {
    return response.status(400).json(error)
  }
})

app.post('/patchpanel/add', async (request, response) => {
  try {
    const {patchCode, rackId} = request.body

    insertFunctions.newPatchPanel(patchCode, rackId)

    return response.status(200).json()
    
  } catch (err) {
    return response.status(400).json(err)
  }
})

app.post("/patchport/add", async(request, response) => {
  try {
    const { portId, patchCode, portCode } = request.body
    insertFunctions.newPatchPort(parseInt(portId), parseInt(portCode), patchCode)
    return response.status(200).json()
  } catch(err) {
    return response.status(400).json(err)
  }
})


### Schema.prisma

model Patchpanel {
  id Int @id @default(autoincrement())
  code String @unique
  rackCode String
  rack Rack @relation(fields: [rackCode], references: [code])
  patchports Patchport[]
}

model Patchport {
  id Int @id @default(autoincrement())
  patchcode String
  patchpanel Patchpanel @relation(fields: [patchcode], references: [code])
  switchportId Int
  switchport Port @relation(fields: [switchportId], references: [id])
}

### Insert functions

newPatchPanel: async (patchCode: string, rackId: string) => {
        await prisma.patchpanel.create({
            data: {
                code: patchCode,
                rackCode: rackId
            }
        })
    },
    newPatchPort: async(portId: number, switchPort: number, patchCode: string) => {
        await prisma.patchport.create({
            data: {
                id: portId,
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

### Readfunctions
  
  queryPatchPanel: {
        queryAll: async() => {
            const allPatchPanels = await prisma.patchpanel.findMany()

            .catch((e) => {
                throw e;
                })
            .finally(async () => {
            await prisma.$disconnect();
            });

            return allPatchPanels
        }
    }