import prismaExecute from "../../../prisma/commands";

export default async function handler(req, res) {
    if(req.method === 'GET') {
        try {
            const response = await prismaExecute.read.port.all()
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    else if (req.method === 'POST') {

        if (req.body.manyPorts !== true) {

            try {
                const {portCode, switchCode, departId, portDesc, patchPortDesc} = req.body
                const createdPort = await prismaExecute.insert.port(portCode, parseInt(switchCode), portDesc, parseInt(departId), patchPortDesc)
                return res.status(200).json(createdPort)
            } catch (error) {
                console.log(error)
            }
    
        } else if (req.body.manyPorts === true) {

            try {
                const {portCodeInit, portCodeEnd, switchCode, departId} = req.body
            
                for(let count = parseInt(portCodeInit); count <= parseInt(portCodeEnd); count++) {
                    await prismaExecute.insert.port(count.toString(), parseInt(switchCode), '', parseInt(departId), '')
                }
            
                return res.status(200).json({message: "Created!"})
            } catch (error) {
                console.log(error) 
            }
        }

    } else if(req.method === 'PUT') {

        try {
            const {portId, portCode, portDesc, patchPortDesc, departId} = req.body

            const updatedPort = await prismaExecute.update.port(portId, portCode, portDesc, parseInt(departId), patchPortDesc)
    
            return res.status(200).json(updatedPort)
        } catch (error) {
           console.log(error) 
        }

       

    } else if(req.method === 'DELETE') {
        try {
            const {portId} = req.body

            const deletedPort = await prismaExecute.delete.port(portId)

            return res.status(200).json(deletedPort)
        } catch (error) {
           console.log(error) 
        }

    } else {
        return res.json({message: 'Erro na requisição!'})
    }
}