import express, { response } from 'express'

const app = express()

import cors from 'cors'
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true}))

import insertFunctions from './prismaCommands/insert'
import readFunctions from './prismaCommands/read'
import deleteFunctions from './prismaCommands/delete'


app.get('/', async (req, res) => {
  try {
    const querySwitchs = await readFunctions.querySwitch.queryAll()

    return res.json(querySwitchs)
  } catch (err) {
    return res.status(400).json(err)
  }
})


app.post('/switchs', async (request, response) => {
  try {
    const {code, rackCode} = request.body

    insertFunctions.newSwitch(code,rackCode)

    return response.json("Switch inserido!")
    
  } catch (err) {
    return response.status(400).json(err)
  }
})

app.post('/port/add', async (request, response) => {
  try {
    const {code, switchCode, portDesc} = request.body

    insertFunctions.newPort(code, switchCode, portDesc)

    return response.status(400).json()
    
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
    return response.json(portData)
  } 
  catch (err) {
    return response.status(400).json(err)
  }
})

app.listen('3001', () => {
    console.log('Servidor está rodando!')
})