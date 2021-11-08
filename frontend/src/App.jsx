import React, { useEffect, useState, Suspense, lazy } from "react";
import PortInfo from "./components/PortInfo";
import axios from "axios";
import SwitchsElements from "./components/Switchs";
import Button from "./components/Button";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {

  const [hackData, setHackData] = useState([
    {
      id: 1,
      Ports: [
        {
          code: "1",
          desc: 'lorenipsun'
        },
        {
          code: "2",
          desc: 'loreion'
        }
      ]
    },
    {
      id: 2,
      Ports: [
        {
          code: "1",
          desc: "loren"
        },
        {
          code: "2",
          desc: "loren2"
        }
      ]
    }
  ])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3001')
      setHackData(data)
    }

    fetchData()
  }, [])

  return (
    <Router>
      <div className="hack">
        <Routes>
          <Route exact path="/" element={<SwitchsElements data={hackData}/>}/>
          <Route path="port/:portId" element={<PortInfo/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App