import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const {departId, departName, groupId} = req.body

        const updatedDepartment = await prismaExecute.update.department(departId, departName, parseInt(groupId))

        return res.status(200).json(updatedDepartment)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo PUT!'})
}