import React, { useEffect, useState } from "react";
import PortInfo from "./components/PortInfo";
import axios from "axios";
import SwitchsElements from "./components/Switchs";
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreatePort from "./components/CreatePort";
import HeaderElement from "./components/Header";

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
      const { data } = await axios.get(`http://localhost:3001`)
      console.log(process.env.port)
      setHackData(data)
    }

    fetchData()
  }, [])


  const handleDeletePort = async () => {
    const newData = await (await axios.get(`http://localhost:3001`)).data
    setHackData(newData)
    return ("Deleted")
  }

  const handleCreatePort = async () => {
    const newData = await (await axios.get(`http://localhost:3001`)).data
    setHackData(newData)
    return ("Created")
}

  const handleUpdatePort = async () => {
    const newData = await (await axios.get(`http://localhost:3001`)).data
    setHackData(newData)
    return("Updated")
  }

  let departmentId = 1

  const handleFilterPorts = async () => {
    const filteredData = await axios.get(`http://localhost:3001/department/${departmentId}`)
    console.log(filteredData.data)
  }

  return (
    <Router>
      <HeaderElement/>
      <div className="hack">
        <Routes>
          <Route exact path="/" element={<SwitchsElements data={hackData} handleFilterPorts={handleFilterPorts}/>}/>
          <Route path="port/:portId" element={<PortInfo handleDeletePort={handleDeletePort} handleUpdatePort={handleUpdatePort}/>} />
          <Route path="port/add/" element={<CreatePort handleCreatePort={handleCreatePort}/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App