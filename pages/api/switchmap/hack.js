import prismaExecute from "../../../prisma/commands";

export default async function handler(req, res) {
    if(req.method === 'GET') {

        const allHacks = await prismaExecute.read.hack.all()
        return res.json(allHacks)

    }

    else if (req.method === 'POST') {

        const hackCodename = req.body.codename
        const createdHack = await prismaExecute.insert.hack(hackCodename)
        return res.status(200).json(createdHack)

    } else if(req.method === 'PUT') {

        const {hackId, codename} = req.body

        const updatedHack = await prismaExecute.update.hack(parseInt(hackId), codename)

        return res.status(200).json(updatedHack)
        

    } else if(req.method === 'DELETE') {

        const {hackId} = req.body

        const deletedHack = await prismaExecute.delete.hack(hackId)

        return res.status(200).json(deletedHack)

    } else {
        return res.json({message: 'Erro na requisição!'})
    }
}