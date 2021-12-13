import prismaExecute from "../../../../prisma/commands"

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        const {portId} = req.body

        const deletedPort = await prismaExecute.delete.port(portId)

        res.status(200).json(deletedPort)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo DELETE!'})
}