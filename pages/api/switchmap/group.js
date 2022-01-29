import prismaExecute from "../../../prisma/commands";


export default async function handler(req, res) {
    if(req.method === 'GET') {
        const allGroups = await prismaExecute.read.group.all()
        return res.json(allGroups)
    }

    else if (req.method === 'POST') {

        const {groupName, color} = req.body
        const createdGroup = await prismaExecute.insert.group(groupName, color)
        return res.status(200).json(createdGroup)

    } else if(req.method === 'PUT') {

        const {groupId, groupName, groupColor} = req.body

        const updatedGroup = await prismaExecute.update.group(groupId, groupName, groupColor)

        return res.status(200).json(updatedGroup)

    } else if(req.method === 'DELETE') {

        const {groupId} = req.body

        const deletedGroup = await prismaExecute.delete.group(parseInt(groupId))

        return res.status(200).json(deletedGroup)

    } else {
        return res.json({message: 'Erro na requisição!'})
    }
}