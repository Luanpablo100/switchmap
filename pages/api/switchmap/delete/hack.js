import prismaExecute from "../../../../prisma/commands"

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        const {hackId} = req.body

        const deletedHack = await prismaExecute.delete.hack(hackId)

        res.status(200).json(deletedHack)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo DELETE!'})
}