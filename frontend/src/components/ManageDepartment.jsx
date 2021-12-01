import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './PortInfo.css'
import axios from 'axios';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

import InputElement from './InputElement';

const ManageDepartment = ({handleSetNewDepartmentData, server}) => {

    const params = useParams()

    const navigate = useNavigate()

    const [departmentData, setDepartmentData] = useState([{
        id: '1',
        departName: "Carregando...",
        Ports: []
    }])
    
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`http://${server.name}:${server.port}/department/${params.departId}`)
            setDepartmentData(data)
        }
    
        getData()
        // eslint-disable-next-line
      }, [])

        const handleDeleteButtonClick = async() => {
            await axios.delete(`http://${server.name}:${server.port}/department/${params.departId}`)

            handleSetNewDepartmentData().then(navigate("/switchmap/manage/department"))
        }

        const handleChangeInputValue = () => {
            return
        }

        const handleUpdateData = async() => {
            const inputDepartName = document.getElementById('input-depart-name').value

            if(inputDepartName === '' || inputDepartName === null) {
                return alert(`Campos necessários estão vazios!`)
            }

            const newData = {...departmentData, departName: inputDepartName}

            await axios.put(`http://${server.name}:${server.port}/department/${params.departId}`, newData)
            handleSetNewDepartmentData().then(navigate('/switchmap/manage/department'))
        }
            
    return ( 
        <>
       
        <div className="container">
            <div>
                <Link to="/switchmap/manage/department" className="react-link">Voltar</Link>
            </div>
            <div className="title-container">
                <h1>Gerenciar departamento</h1>
            </div>
            <div className="description">
                <h3>Nome</h3>
                <InputElement handleChangeInputValue={handleChangeInputValue} configuration={"input-depart-name"} type={"text"} key={departmentData.id} >{departmentData.departName}</InputElement>              
            </div>
            <div className="port-control">
                <BiSave  className="save-icon" onClick={handleUpdateData}/>
                <CgTrash className="delete-icon" onClick={handleDeleteButtonClick}/>
            </div>
        </div>
        </>
     );
}
 
export default ManageDepartment;