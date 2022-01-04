import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {groupName, color} = req.body
        const createdGroup = await prismaExecute.insert.group(groupName, color)
        return res.status(200).json(createdGroup)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo POST!'})
}