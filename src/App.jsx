import React, { useEffect, useState } from "react";
import Switch from "./components/Switch";
import './App.css'
import readFunctions from './prisma/read'

const App = () => {

  const [hackData, setHackData] = useState([
    {
      id: 1,
      ports: [
        {
          port: 1
        },
        {
          port: 2
        }
      ]
    },
    {
      id: 2,
      ports: [
        {
          port: 1
        },
        {
          port: 2
        }
      ]
    }
  ])

  useEffect(() => {
    const fetchData = async() => {
      const dataFromDb = await readFunctions.querySwitch.queryAll()
      console.log(dataFromDb)
    }

    fetchData()
  }, [])

  return (
    <div>
      {hackData.map(sw => <Switch sw={sw}/>)}
    </div>
  )
}

export default App