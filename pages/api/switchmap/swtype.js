import prismaExecute from "../../../prisma/commands";

export default async function handler(req, res) {
    if(req.method === 'GET') {
        const allTypes = await prismaExecute.read.switchType.all()
        return res.json(allTypes)
    }

    else if (req.method === 'POST') {

        const {typeName, color1, color2, color3, color4, color5} = req.body
        const createdSwType = await prismaExecute.insert.switchType(typeName, color1, color2, color3, color4, color5)
        return res.status(200).json(createdSwType)

    } else if(req.method === 'PUT') {

        const {typeId, typeName, color1, color2, color3, color4, color5} = req.body

        const updatedSwType = await prismaExecute.update.switchType(typeId, typeName, color1, color2, color3, color4, color5)

        return res.status(200).json(updatedSwType)

    } else if(req.method === 'DELETE') {

        const {typeId} = req.body

        const deletedSwType = await prismaExecute.delete.switchType(parseInt(typeId))

        return res.status(200).json(deletedSwType)

    } else {
        return res.json({message: 'Erro na requisição!'})
    }
}