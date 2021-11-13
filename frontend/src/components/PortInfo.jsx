import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './PortInfo.css'
import axios from 'axios';

const PortInfo = ({handleDeletePort, handleUpdatePort}) => {

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
          const { data } = await axios.get(`http://localhost:3001/port/${params.portId}`).then(console.log("Busquei"))
          setPortData(data)
        }
    
        getData()
      }, [])

        const handleDeleteButtonClick = async() => {
            await axios.delete(`http://localhost:3001/port/${params.portId}`)

            handleDeletePort().then(navigate("/"))
        }

        const handleChangeInputValue = () => {
            const inputPortCode = document.getElementById('input-port-code').value
            const inputPortDesc = document.getElementById('input-port-desc').value
            const newData = {...portData, code: inputPortCode, desc: inputPortDesc}
            setPortData(newData)
        }

        const handleUpdateData = async() => {
            await axios.put(`http://localhost:3001/port/${params.portId}`, portData)
            handleUpdatePort().then(navigate('/'))
        }
            
    
    return ( 
        <div className="info-container">
            <div className="title-container">
                <Link to="/">Voltar</Link>
                PORTA <input type="text" name="input-port-code" id="input-port-code" value={portData.code} onChange={handleChangeInputValue}/> <h1>Switch - {portData.switchCode}</h1>
            </div>
            <div className="description">
                <h3>Descrição</h3>
                <input type="text" name="input-port-desc" id="input-port-desc" value={portData.desc} onChange={handleChangeInputValue}/>
            </div>
            <div className="port-control">
                <button className="update-button" onClick={handleUpdateData}>Atualizar</button>
                <button className="delete-button" onClick={handleDeleteButtonClick}>Apagar</button>
            </div>
        </div>
     );
}
 
export default PortInfo;