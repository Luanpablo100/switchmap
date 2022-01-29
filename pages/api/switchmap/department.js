import prismaExecute from "../../../prisma/commands";

export default async function handler(req, res) {
    if(req.method === 'GET') {
        const allDepartments = await prismaExecute.read.department.all()
        return res.json(allDepartments)
    }

    else if (req.method === 'POST') {

        const {departName, groupId, hackId, isRestricted} = req.body
        const createdDepartment = await prismaExecute.insert.department(departName, parseInt(groupId), parseInt(hackId), isRestricted)
        return res.status(200).json(createdDepartment)

    } else if(req.method === 'PUT') {

        const {departId, departName, groupId, isRestricted, hackId} = req.body

        const updatedDepartment = await prismaExecute.update.department(departId, departName, parseInt(groupId), isRestricted, parseInt(hackId))

        return res.status(200).json(updatedDepartment)

    } else if(req.method === 'DELETE') {

        const {departId} = req.body

        const deletedDepartment = await prismaExecute.delete.department(parseInt(departId))

        return res.status(200).json(deletedDepartment)

    } else {
        return res.json({message: 'Erro na requisição!'})
    }
}