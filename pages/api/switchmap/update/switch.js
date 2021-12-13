import prismaExecute from "../../../../prisma/commands"

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const {switchId, switchCode} = req.body
        const updatedSwitch = prismaExecute.update.switch(switchId, switchCode)
        return res.status(200).json(updatedSwitch)
    }
    return res.json({message: "A requisição solicitada não é do tipo PUT!"})
}