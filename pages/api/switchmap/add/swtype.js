import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {typeName, color1, color2, color3} = req.body
        const createdSwType = await prismaExecute.insert.switchType(typeName, color1, color2, color3)
        return res.status(200).json(createdSwType)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo POST!'})
}