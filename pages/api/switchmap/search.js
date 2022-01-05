import prismaExecute from "../../../prisma/commands";

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { value} = req.body
        const searchData = await prismaExecute.read.port.search(value)
        return res.json(searchData)
    }
    return res.json({message: 'A requisição não é do tipo GET!'})
}