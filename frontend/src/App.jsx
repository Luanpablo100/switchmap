import React, { useEffect, useState } from "react";
import PortInfo from "./components/PortInfo";
import axios from "axios";
import SwitchsElements from "./components/Switchs";
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreatePort from "./components/CreatePort";
import HeaderElement from "./components/Header";
import Create from "./components/Create";
import CreateSwitch from './components/CreateSwitch'
import CreateDepartment from "./components/CreateDepartment";
import CreateHack from "./components/CreateHack";

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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3001`)
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

const handleCreateHack = async () => {
  const newData = await (await axios.get(`http://localhost:3001`)).data
  setHackData(newData)
  return ("Created")
}

  const handleCreateSwitch = async() => {
    const newData = await (await axios.get(`http://localhost:3001`)).data
    setHackData(newData)
    return('Created')
  }
  
  const handleCreateDepartment = async() => {
    const newData = await (await axios.get(`http://localhost:3001`)).data
    setHackData(newData)
    return('Created')
  }

  const handleUpdatePort = async () => {
    const newData = await (await axios.get(`http://localhost:3001`)).data
    setHackData(newData)
    return("Updated")
  }

  const handleGetData = async () => {
    const oldData = (await axios.get(`http://localhost:3001`)).data
    return oldData
  }

  const handleFilterPorts = async (filterId) => {
    const newData = hackData.map(sw => {
      const newPorts = sw.Ports.filter(port => port.departId === parseInt(filterId))
      sw.Ports = newPorts
      return sw
    })

    setHackData(newData)
  }

  const handleCancelFilter = async() => {
    const oldData = await handleGetData()
    setHackData(oldData)
  }

  return (
    <Router>
      <HeaderElement handleFilterPorts={handleFilterPorts} handleCancelFilter={handleCancelFilter}/>
      <div className="hack">
        <Routes>
          <Route exact path="/" element={<SwitchsElements data={hackData} handleFilterPorts={handleFilterPorts}/>}/>
          <Route path="port/:portId" element={<PortInfo handleDeletePort={handleDeletePort} handleUpdatePort={handleUpdatePort}/>} />
          <Route path="create/" element={<Create handleCreatePort={handleCreatePort} handleCreateSwitch={handleCreateSwitch}/>}/>
          <Route path="port/add/" element={<CreatePort handleCreatePort={handleCreatePort}/>}/>
          <Route path="switch/add/" element={<CreateSwitch handleCreateSwitch={handleCreateSwitch}/>}/>
          <Route path="department/add/" element={<CreateDepartment handleCreateDepartment={handleCreateDepartment}/>}/>
          <Route path="/hack/add" element={<CreateHack handleCreateHack={handleCreateHack}/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App