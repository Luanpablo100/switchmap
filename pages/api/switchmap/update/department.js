import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const {departId, departName} = req.body

        const updatedDepartment = await prismaExecute.update.department(departId, departName)

        return res.status(200).json(updatedDepartment)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo PUT!'})
}