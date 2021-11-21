import express  from 'express'

const app = express()

import cors from 'cors'
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

import insertFunctions from './prismaCommands/insert'
import readFunctions from './prismaCommands/read'
import deleteFunctions from './prismaCommands/delete'
import editFunctions from './prismaCommands/edit'
import { env } from 'process'


app.get('/', async (req, res) => {
  try {
    const querySwitchs = await readFunctions.querySwitch.queryAll()

    return res.status(200).json(querySwitchs)
  } catch (err) {
    return res.status(400).json(err)
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

app.post('/port/add', async (request, response) => {
  try {
    const {code, switchCode, portDesc, departId} = request.body

    insertFunctions.newPort(code, switchCode, portDesc, parseInt(departId))

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
    const {id, code, desc, departId} = request.body
    editFunctions.editPort(id, code, desc, parseInt(departId))

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

const PORT = process.env.port

app.listen(PORT, () => {
    console.log('Servidor está rodando!')
})
