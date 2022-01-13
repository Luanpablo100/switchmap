import prismaExecute from "../../../../prisma/commands"

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        const {groupId} = req.body

        const deletedGroup = await prismaExecute.delete.group(parseInt(groupId))

        return res.status(200).json(deletedGroup)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo DELETE!'})
}