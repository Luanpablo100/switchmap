import { rejects } from 'assert/strict'
import express from 'express'
import { resolve } from 'path/posix'
import { getEnvironmentData } from 'worker_threads'

const app = express()

import insertFunctions from './prismaCommands/insert'
import readFunctions from './prismaCommands/read'

app.get('/', async function(req, res) {

        async function getData () {
            return new Promise((resolve, reject) => {
              setTimeout(resolve)
            });
          }
          

    await getData()
    res.send('hello world')
})

app.listen('3001', () => {
    console.log('Servidor está rodando!')
})