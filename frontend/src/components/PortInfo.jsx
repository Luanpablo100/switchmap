import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './PortInfo.css'
import axios from 'axios';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

import InputElement from './InputElement';

const PortInfo = ({handleDeletePort, handleUpdatePort}) => {

    const params = useParams()

    const navigate = useNavigate()

    const [portData, setPortData] = useState({
        id: 1,
        code: "1",
        switchCode: "1",
        desc: "",
        departId: 1,
        department: {
            departName: "Indefinido",
            id: 1
        }
    })

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
        const getData = async () => {
            const { data } = await axios.get(`http://localhost:3001/port/${params.portId}`)
            setPortData(data)

            const getDepartments = async () => {
                const { data } = await axios.get('http://localhost:3001/department')
                setDepartments(data)
            } 
            getDepartments()
        }
    
        getData()
        // eslint-disable-next-line
      }, [])

        const handleDeleteButtonClick = async() => {
            await axios.delete(`http://localhost:3001/port/${params.portId}`)

            handleDeletePort().then(navigate("/"))
        }

        const handleChangeInputValue = () => {
            const inputPortCode = document.getElementById('input-port-code').value
            const inputPortDesc = document.getElementById('input-port-desc').value
            const inputPortDepartment = document.getElementById('department-select').value
            const newData = {...portData, code: inputPortCode, desc: inputPortDesc, departId: inputPortDepartment}
            setPortData(newData)
        }

        const handleUpdateData = async() => {
            await axios.put(`http://localhost:3001/port/${params.portId}`, portData)
            handleUpdatePort().then(navigate('/'))
        }
            
    return ( 
        <div className="info-container">
            <div className="title-container">
                <div>
                    <Link to="/" className="react-link">Voltar</Link>
                </div>
                <div className="headers-info">
                <h1>Porta - </h1>
                    <InputElement handleChangeInputValue={handleChangeInputValue} configuration={"input-port-code"} type={"number"}>{portData.code}</InputElement>
                    <h1>Switch - {portData.switchCode}</h1>
                </div>
            </div>
            <div className="description">
                <h3>Descrição</h3>
                <InputElement handleChangeInputValue={handleChangeInputValue} configuration={"input-port-desc"} type={"text"}>{portData.desc}</InputElement>

                <select name="department-select" id="department-select" onChange={handleChangeInputValue} className="select-port-department">
                    <option value={portData.departId}>{portData.department.departName}</option>
                    {departments.map((department) => { 
                        if (department.id === portData.departId) {return null}
                        return (<option value={department.id}>{department.departName}</option>)
                    })}
                </select>

            </div>
            <div className="port-control">
                <BiSave style={{width: "35px", height:"35px", cursor: "pointer"}} onClick={handleUpdateData}/>
                <CgTrash style={{width: "35px", height:"35px", cursor: "pointer"}} onClick={handleDeleteButtonClick}/>
            </div>
        </div>
     );
}
 
export default PortInfo;