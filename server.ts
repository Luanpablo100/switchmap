import express, { request, response }  from 'express'

const app = express()

import cors from 'cors'
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

import insertFunctions from './prismaCommands/insert'
import readFunctions from './prismaCommands/read'
import deleteFunctions from './prismaCommands/delete'
import editFunctions from './prismaCommands/edit'


app.get('/', async (req, res) => {
  try {
    const querySwitchs = await readFunctions.querySwitch.queryAll()

    return res.status(200).json(querySwitchs)
  } catch (err) {
    return res.status(400).json(err)
  }
})

app.post('/hack/add', async (request, response) => {
  try {
    const {rackId} = request.body

    insertFunctions.newRack(rackId)

    return response.status(200).json()
    
  } catch (err) {
    return response.status(400).json(err)
  }
})

app.get('/switch/:switchId', async(request, response) => {
  try {
    const switchId = request.params.switchId
    const queryFindSwitch = await readFunctions.querySwitch.queryFind(parseInt(switchId))
    return response.status(200).json(queryFindSwitch)
  } catch (err) {
    return response.status(400).json(err)
  }
})

app.post('/switch/add', async (request, response) => {
  try {
    const {code, rackCode} = request.body

    insertFunctions.newSwitch(code,rackCode)

    return response.status(200).json()
    
  } catch (err) {
    return response.status(400).json(err)
  }
})

app.delete('/switch/:switchId', async (request, response) => {
  try {
    await deleteFunctions.deleteSwitch(parseInt(request.params.switchId))
    return response.status(200).json()
  }catch(err) {
    response.status(400).json()
  }
})

app.post('/port/add', async (request, response) => {
  try {
    const {code, switchCode, portDesc, departId, patchportdesc} = request.body

    insertFunctions.newPort(code, switchCode, portDesc, parseInt(departId), patchportdesc)

    return response.status(200).json()
    
  } catch (err) {
    return response.status(400).json(err)
  }
})

app.delete('/port/:portId', async (request, response) => {
  try {
    await deleteFunctions.deletePort(parseInt(request.params.portId))
    return response.status(200).json()
  } 
  catch (err) {
    return response.json(400).json(err)
  }
})

app.get('/port/:portId', async (request, response) => {
  try {
    const portData = await readFunctions.queryPort.queryFind(parseInt(request.params.portId))
    return response.status(200).json(portData)
  } 
  catch (err) {
    return response.status(400).json(err)
  }
})

app.put('/port/:portId', async (request, response) => {
  try {
    const {id, code, desc, departId, patchportdesc} = request.body
    editFunctions.editPort(id, code, desc, parseInt(departId), patchportdesc)

    return response.status(200).json()
    
  } catch (err) {
    return response.status(400).json(err)
  }
})

app.get('/department', async (request, response) => {
  try {
    const departmentData = await readFunctions.queryDepartment.queryAll()
    return response.status(200).json(departmentData)
  }catch(err) {
    return response.status(400).json(err)
  }
})

app.get('/department/:departId', async(request, response) => {
  try {
    const departmentId = parseInt(request.params.departId) 
    const findDepartment = await readFunctions.queryDepartment.queryFind(departmentId)
    return response.status(200).json(findDepartment)
  } catch (err) {
    return response.status(400).json(err)
  }
})

app.post('/department/add', async(request, response) => {
  try {
    const {departName} = request.body
    insertFunctions.newDepartment(departName)
    return response.status(200).json()
  } catch(err) {
    return response.status(400).json(err)
  }
})

app.delete('/department/:departId', async (request, response) => {
  try {
    await deleteFunctions.deleteDepartment(parseInt(request.params.departId))
    return response.status(200).json()
  } catch(err) {
    response.status(400).json(err)
  }
})

const PORT = process.env.port

app.listen(PORT, () => {
    console.log('Servidor está rodando!')
})
