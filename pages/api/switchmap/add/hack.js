import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const hackCodename = req.body.codename
        const createdHack = await prismaExecute.insert.hack(hackCodename)
        return res.status(200).json(createdHack)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo POST!'})
}