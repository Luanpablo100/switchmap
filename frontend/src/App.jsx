import React, { useEffect, useState } from "react";
import PortInfo from "./components/PortInfo";
import axios from "axios";
import SwitchsElements from "./components/Switchs";
import './App.css'
import { BrowserRouter as Router, Link, Route, Routes, useParams} from 'react-router-dom';
import CreatePort from "./components/CreatePort";

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

  const params = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3001')
      setHackData(data)
    }

    fetchData()
  }, [])


  const handleDeletePort = async () => {
    const newData = await (await axios.get('http://localhost:3001/')).data
    setHackData(newData)
    return ("Deleted")
  }

  const handleCreatePort = async () => {
    const newData = await (await axios.get('http://localhost:3001/')).data
    setHackData(newData)
    return ("Created")
}

  return (
    <Router>
      <div className="hack">
        <Routes>
          <Route exact path="/" element={<SwitchsElements data={hackData}/>}/>
          <Route path="port/:portId" element={<PortInfo handleDeletePort={handleDeletePort}/>} />
          <Route path="port/add/" element={<CreatePort handleCreatePort={handleCreatePort}/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App