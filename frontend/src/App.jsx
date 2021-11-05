import React, { useEffect, useState } from "react";
import Switch from "./components/Switch";
import './App.css'

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

  return (
    <div>
      {hackData.map(sw => <Switch sw={sw}/>)}
    </div>
  )
}

export default App