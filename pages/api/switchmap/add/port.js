import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'POST') {

        if (req.body.manyPorts !== true) {
            const {portCode, switchCode, departId, portDesc, patchPortDesc} = req.body
            const createdPort = await prismaExecute.insert.port(portCode, parseInt(switchCode), portDesc, parseInt(departId), patchPortDesc)
            return res.status(200).json(createdPort)

        } else if (req.body.manyPorts === true) {
            const {portCodeInit, portCodeEnd, switchCode, departId} = req.body
            
            for(let count = portCodeInit; count <= portCodeEnd; count++) {
                await prismaExecute.insert.port(count.toString(), parseInt(switchCode), "", parseInt(departId), "")
            }
            
            return res.status(200).json({message: "Created!"})
        }
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo POST!'})
}