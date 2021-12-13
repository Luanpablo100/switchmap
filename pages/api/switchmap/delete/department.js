import prismaExecute from "../../../../prisma/commands"

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        const {departId} = req.body

        const deletedDepartment = await prismaExecute.delete.department(parseInt(departId))

        res.status(200).json(deletedDepartment)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo DELETE!'})
}