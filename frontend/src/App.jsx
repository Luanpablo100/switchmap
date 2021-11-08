import React, { useEffect, useState } from "react";
import Switch from "./components/Switch";
import PortInfo from "./components/PortInfo";
import './App.css'
import { Routes, Route, BrowserRouter} from 'react-router-dom'

const App = () => {

  const [hackData, setHackData] = useState([
    {
      id: 1,
      Ports: [
        {
          code: 1,
          desc: 'lorenipsun'
        },
        {
          code: 2,
          desc: 'loreion'
        }
      ]
    },
    {
      id: 2,
      Ports: [
        {
          code: 1,
          desc: "loren"
        },
        {
          code: 2,
          desc: "loren2"
        }
      ]
    }
  ])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get('http://localhost:3001')
  //     setHackData(data)
  //   }

  //   fetchData()
  // }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact render={() => (
          <div className={"hack"}>
            {hackData.map(sw => <Switch sw={sw}/>)}
          </div>
        )}
        />
        <Route path="/:portId" exact component={PortInfo}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App