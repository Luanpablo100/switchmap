import prismaExecute from "../../../prisma/commands";

export default async function handler(req, res) {
    if(req.method === 'GET') {

    }

    else if (req.method === 'POST') {

        const {switchCode, hackCode, swTypeId, location, reference, mac, ip} = req.body
        const createdSwitch = await prismaExecute.insert.switch(switchCode, parseInt(hackCode), parseInt(swTypeId), location, reference, mac, ip)
        return res.status(200).json(createdSwitch)

    } else if(req.method === 'PUT') {

        const {switchId, switchCode, swTypeId} = req.body
        const updatedSwitch = prismaExecute.update.switch(switchId, switchCode, parseInt(swTypeId), location, reference, mac, ip)
        return res.status(200).json(updatedSwitch)

    } else if(req.method === 'DELETE') {
    
        const {switchId} = req.body

        const deletedSwitch = await prismaExecute.delete.switch(switchId)

        return res.status(200).json(deletedSwitch)

    } else {
        return res.json({message: 'Erro na requisição!'})
    }
}