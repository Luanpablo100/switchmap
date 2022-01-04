import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const {groupId, groupName, groupColor} = req.body

        const updatedGroup = await prismaExecute.update.group(groupId, groupName, groupColor)

        return res.status(200).json(updatedGroup)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo PUT!'})
}