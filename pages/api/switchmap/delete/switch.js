import prismaExecute from "../../../../prisma/commands"

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        const {switchId} = req.body

        const deletedSwitch = await prismaExecute.delete.switch(switchId)

        return res.status(200).json(deletedSwitch)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo DELETE!'})
}