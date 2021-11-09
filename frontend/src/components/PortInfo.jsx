import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './PortInfo.css'
import axios from 'axios';

const PortInfo = () => {
    const params = useParams()

    const navigate = useNavigate()

    const [portData, setPortData] = useState({
        id: 1,
        code: "1",
        switchCode: "1",
        desc: "",
    })


    useEffect(() => {
        const getData = async () => {
          const { data } = await axios.get(`http://localhost:3001/port/${params.portId}`)
          setPortData(data)
        }
    
        getData()
      }, [])

      async function deletePort() {
        await axios.delete(`http://localhost:3001/port/${params.portId}`)
        return navigate('/')
      }
    
    return ( 
        <div className="info-container">
            <div className="title-container">
                <Link to="/">Voltar</Link>
                <h1 className={"title"}>Porta {portData.code} - Switch {portData.switchCode}</h1>
            </div>
            <div className="description">
                <h3>Descrição</h3>
                {portData.desc}
            </div>
            <div className="port-control">
                <button className="delete-button" onClick={deletePort}>Apagar</button>
            </div>
        </div>
     );
}
 
export default PortInfo;