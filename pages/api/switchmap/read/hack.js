import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if(req.method === 'GET') {
        const allHacks = await prismaExecute.read.hack.all()
        return res.json(allHacks)
    }
    return res.json({message: 'A requisição não é do tipo GET!'})
}