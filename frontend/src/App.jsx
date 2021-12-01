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
import Manage from "./components/Manage";
import SwitchList from "./components/SwitchList";
import ManageSwitch from "./components/ManageSwitch";
import ManageDepartment from "./components/ManageDepartment";
import DepartList from "./components/DepartList";

const App = () => {

  const [hackData, setHackData] = useState([
    {
      id: 1,
      code: '1',
      rackCode: '1',
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
      code: '2',
      rackCode: "1",
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
        departName: "Carregando..."
    },
])

  // const HOST = "localhost"
  const host = {
    name: '10.20.101.14',
    port: '3001'
  }
  // const PORT = "3001"

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://${host.name}:${host.port}`)
      setHackData(data)
    }

    const getDepartments = async () => {
      const { data } = await axios.get(`http://${host.name}:${host.port}/department`)
      setDepartments(data)
    }

    getDepartments()

    fetchData()
  }, [])

  const handleSetNewHackData = async () => {
    const newData = await (await axios.get(`http://${host.name}:${host.port}`)).data
    return setHackData(newData)
    
  }

  const handleSetNewDepartmentData = async() => {
    const newData = await (await (await axios.get(`http://${host.name}:${host.port}/department`)).data)
    return setDepartments(newData)
  }

  const handleGetData = async () => {
    const oldData = (await axios.get(`http://${host.name}:${host.port}`)).data
    return oldData
  }

  const handleCancelFilter = async() => {
    const oldData = await handleGetData()
    setHackData(oldData)
  }

  const handleFilterPorts = async (filterId) => {
    const newData = hackData.map(sw => {
      const newPorts = sw.Ports.filter(port => port.departId === parseInt(filterId))
      sw.Ports = newPorts
      return sw
    })

    setHackData(newData)
  }

  return (
    <Router>
      <HeaderElement handleFilterPorts={handleFilterPorts} handleCancelFilter={handleCancelFilter} departmentData={departments}/>
      <div className="hack">
        <Routes>
          <Route exact path='/'>
            <Redirect to="/dashboard"/>
          </Route>
          <Route exact path="/switchmap" element={<SwitchsElements data={hackData} handleFilterPorts={handleFilterPorts}/>}/>
          <Route path="/switchmap/port/:portId" element={<PortInfo handleSetNewHackData={handleSetNewHackData} server={host}/>} />
          <Route path="/switchmap/create/" element={<Create handleSetNewHackData={handleSetNewHackData}/>}/>
          <Route path="/switchmap/port/add/" element={<CreatePort handleSetNewHackData={handleSetNewHackData} server={host}/>}/>
          <Route path="/switchmap/switch/add/" element={<CreateSwitch handleSetNewHackData={handleSetNewHackData} server={host}/>}/>
          <Route path="/switchmap/department/add/" element={<CreateDepartment handleSetNewDepartmentData={handleSetNewDepartmentData} server={host}/>}/>
          <Route path="/switchmap/hack/add" element={<CreateHack handleSetNewHackData={handleSetNewHackData} server={host}/>}/>
          <Route path="/switchmap/manage" element={<Manage handleSetNewHackData={handleSetNewHackData}/>}/>
          <Route path="/switchmap/manage/switch" element={<SwitchList switchdata={hackData}/>}/>
          <Route path="/switchmap/switch/:switchId" element={<ManageSwitch handleSetNewHackData={handleSetNewHackData} server={host}/>}/>
          <Route path="/switchmap/manage/department" element={<DepartList departmentData={departments}/>}/>
          <Route path="/switchmap/department/:departId" element={<ManageDepartment handleSetNewDepartmentData={handleSetNewDepartmentData} server={host}/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App