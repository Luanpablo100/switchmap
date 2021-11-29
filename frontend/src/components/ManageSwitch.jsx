import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './PortInfo.css'
import axios from 'axios';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

import InputElement from './InputElement';

const ManageSwitch = ({handleSetNewHackData, server}) => {

    const params = useParams()

    const navigate = useNavigate()

    const [switchData, setSwitchData] = useState([{
        id: 1,
        code: "1",
        rackCode: '1'
    }])
    
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`http://${server.name}:${server.port}/switch/${params.switchId}`)
            setSwitchData(data)
        }
    
        getData()
        // eslint-disable-next-line
      }, [])

        const handleDeleteButtonClick = async() => {
            await axios.delete(`http://${server.name}:${server.port}/switch/${params.switchId}`)

            handleSetNewHackData().then(navigate("/"))
        }

        const handleChangeInputValue = () => {
            return
        }

        const handleUpdateData = async() => {
            const inputPortCode = document.getElementById('input-switch-code').value
            const newData = {...switchData, switchcode: inputPortCode}

            await axios.put(`http://${server.name}:${server.port}/switch/${params.switchId}`, newData)
            handleSetNewHackData().then(navigate('/'))
        }
            
    return ( 
        <>
       
        <div className="container">
            <div>
                <Link to="/manage/switch" className="react-link">Voltar</Link>
            </div>
            <div className="title-container">
                <h1>Gerenciar switch</h1>
            </div>
            <div className="description">
                <h3>Número do switch</h3>
                <InputElement handleChangeInputValue={handleChangeInputValue} configuration={"input-switch-code"} type={"text"} key={switchData.id}>{switchData.code}</InputElement>              
            </div>
            <div className="port-control">
                <BiSave  className="save-icon" onClick={handleUpdateData}/>
                <CgTrash className="delete-icon" onClick={handleDeleteButtonClick}/>
            </div>
        </div>
        </>
     );
}
 
export default ManageSwitch;