import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {portCode, switchCode, departId, portDesc, patchPortDesc} = req.body
        const createdPort = await prismaExecute.insert.port(portCode, parseInt(switchCode), portDesc, parseInt(departId), patchPortDesc)
        return res.status(200).json(createdPort)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo POST!'})
}