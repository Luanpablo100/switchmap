import React, { useEffect, useState } from "react";
import PortInfo from "./components/PortInfo";
import axios from "axios";
import SwitchsElements from "./components/Switchs";
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3001').then(console.log("busquei"))
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

  const handleUpdatePort = async () => {
    const newData = await (await axios.get('http://localhost:3001/')).data
    setHackData(newData)
    return("Updated")
  }

  return (
    <Router>
      <div className="hack">
        <Routes>
          <Route exact path="/" element={<SwitchsElements data={hackData}/>}/>
          <Route path="port/:portId" element={<PortInfo handleDeletePort={handleDeletePort} handleUpdatePort={handleUpdatePort}/>} />
          <Route path="port/add/" element={<CreatePort handleCreatePort={handleCreatePort}/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App