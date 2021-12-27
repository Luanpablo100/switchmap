import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {departName, color} = req.body
        const createdDepartment = await prismaExecute.insert.department(departName, color)
        return res.status(200).json(createdDepartment)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo POST!'})
}