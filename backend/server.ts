import express, { response } from 'express'



const app = express()

import cors from 'cors'
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true}))

import insertFunctions from './prismaCommands/insert'
import readFunctions from './prismaCommands/read'


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

app.post('/ports', async (request, response) => {
  try {
    const {code, switchCode, portDesc} = request.body

    insertFunctions.newPort(code, switchCode, portDesc)

    return response.json("Porta cadastrada!")
    
  } catch (err) {
    return response.status(400).json(err)
  }
})

app.post('/port/delete/', async (request, response) => {
  try {
    const {code, switchCode, portDesc} = request.body

    insertFunctions.newPort(code, switchCode, portDesc)

    return response.json("Porta cadastrada!")
    
  } catch (err) {
    return response.status(400).json(err)
  }
})

app.listen('3001', () => {
    console.log('Servidor está rodando!')
})