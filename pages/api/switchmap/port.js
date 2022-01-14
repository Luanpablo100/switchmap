import prismaExecute from "../../../prisma/commands";

export default async function handler(req, res) {
    if(req.method === 'GET') {

    }

    else if (req.method === 'POST') {

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

    } else if(req.method === 'PUT') {

        const {portId, portCode, portDesc, patchPortDesc, departId} = req.body

        const updatedPort = await prismaExecute.update.port(portId, portCode, portDesc, parseInt(departId), patchPortDesc)

        return res.status(200).json(updatedPort)

    } else if(req.method === 'DELETE') {

        const {portId} = req.body

        const deletedPort = await prismaExecute.delete.port(portId)

        return res.status(200).json(deletedPort)

    } else {
        return res.json({message: 'Erro na requisição!'})
    }
}