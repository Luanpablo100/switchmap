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
          desc: 'lorenipsun',
          departId: 1
        },
        {
          code: "2",
          desc: 'loreion',
          departId: 1
        }
      ]
    },
    {
      id: 2,
      Ports: [
        {
          code: "1",
          desc: "loren",
          departId: 1
        },
        {
          code: "2",
          desc: "loren2",
          departId: 1
        }
      ]
    }
  ])

  const [departments, setDepartments] = useState([
    {
        id: 1,
        departName: "Admin",
    },
    {
        id: 2,
        departName: "Comercial"
    }
])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3001`)
      setHackData(data)
    }

    const getDepartments = async () => {
      const { data } = await axios.get('http://localhost:3001/department')
      setDepartments(data)
    } 
    getDepartments()

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


  const handleFilterPorts = async (filterId) => {
    const updateData = await axios.get(`http://localhost:3001`)
    setHackData(updateData)

    const newData = hackData.map(sw => {
      const newPorts = sw.Ports.filter(port => port.departId === parseInt(filterId))
      sw.Ports = newPorts
      return sw
    })

    setHackData(newData)
  }

  return (
    <Router>
      <HeaderElement handleFilterPorts={handleFilterPorts} departments={departments}/>
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