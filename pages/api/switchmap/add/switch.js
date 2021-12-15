import prismaExecute from "../../../../prisma/commands";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {switchCode, hackCode} = req.body
        const createdSwitch = await prismaExecute.insert.switch(switchCode,hackCode)
        return res.status(200).json(createdSwitch)
    }
    return res.json({message: 'Erro! A requisição realizada não é do tipo POST!'})
}