import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const {portId, portCode, portDesc, patchPortDesc, departId} = req.body

        const updatedPort = await prismaExecute.update.port(portId, portCode, portDesc, parseInt(departId), patchPortDesc)

        return res.status(200).json(updatedPort)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo PUT!'})
}