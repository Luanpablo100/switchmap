import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const {typeId, typeName, color1, color2, color3} = req.body

        const updatedSwType = await prismaExecute.update.switchType(typeId, typeName, color1, color2, color3)

        return res.status(200).json(updatedSwType)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo PUT!'})
}