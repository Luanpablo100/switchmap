import React, { useState } from "react";
import Switch from "./components/Switch";
import './App.css'
import Ports from "./components/Ports";

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
        },
        {
          port: 3
        },
        {
          port: 4
        },
        {
          port: 5
        },
        {
          port: 6
        },
        {
          port: 7
        },
        {
          port: 8
        },
        {
          port: 9
        },
        {
          port: 10
        },
        {
          port: 11
        },
        {
          port: 12
        },
        {
          port: 13
        },
        {
          port: 14
        },
        {
          port: 15
        },
        {
          port: 16
        },
        {
          port: 17
        },
        {
          port: 18
        },
        {
          port: 19
        },
        {
          port: 20
        },
        {
          port: 21
        },
        {
          port: 22
        },
        {
          port: 23
        },
        {
          port: 24
        },
        {
          port: 25
        },
        {
          port: 26
        },
        {
          port: 27
        },
        {
          port: 28
        },
        {
          port: 29
        },
        {
          port: 30
        },
        {
          port: 31
        },
        {
          port: 32
        },
        {
          port: 33
        },
        {
          port: 34
        },
        {
          port: 35
        },
        {
          port: 36
        },
        {
          port: 37
        },
        {
          port: 38
        },
        {
          port: 39
        },
        {
          port: 40
        },
        {
          port: 41
        },
        {
          port: 42
        },
        {
          port: 43
        },
        {
          port: 44
        },
        {
          port: 45
        },
        {
          port: 46
        },
        {
          port: 47
        },
        {
          port: 48
        },
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
        },
        {
          port: 3
        },
        {
          port: 4
        },
        {
          port: 5
        },
        {
          port: 6
        },
        {
          port: 7
        },
        {
          port: 8
        },
        {
          port: 9
        },
        {
          port: 10
        },
        {
          port: 11
        },
        {
          port: 12
        },
        {
          port: 13
        },
        {
          port: 14
        },
        {
          port: 15
        },
        {
          port: 16
        },
        {
          port: 17
        },
        {
          port: 18
        },
        {
          port: 19
        },
        {
          port: 20
        },
        {
          port: 21
        },
        {
          port: 22
        },
        {
          port: 23
        },
        {
          port: 24
        },
        {
          port: 25
        },
        {
          port: 26
        },
        {
          port: 27
        },
        {
          port: 28
        },
        {
          port: 29
        },
        {
          port: 30
        },
        {
          port: 31
        },
        {
          port: 32
        },
        {
          port: 33
        },
        {
          port: 34
        },
        {
          port: 35
        },
        {
          port: 36
        },
        {
          port: 37
        },
        {
          port: 38
        },
        {
          port: 39
        },
        {
          port: 40
        },
        {
          port: 41
        },
        {
          port: 42
        },
        {
          port: 43
        },
        {
          port: 44
        },
        {
          port: 45
        },
        {
          port: 46
        },
        {
          port: 47
        },
        {
          port: 48
        },
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