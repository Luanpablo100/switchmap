import prismaExecute from "../../../../prisma/commands"

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        const {typeId} = req.body

        const deletedSwType = await prismaExecute.delete.switchType(parseInt(typeId))

        return res.status(200).json(deletedSwType)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo DELETE!'})
}