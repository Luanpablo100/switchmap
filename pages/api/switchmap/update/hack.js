import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const {hackId, codename} = req.body

        const updatedHack = await prismaExecute.update.hack(parseInt(hackId), codename)

        return res.status(200).json(updatedHack)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo PUT!'})
}