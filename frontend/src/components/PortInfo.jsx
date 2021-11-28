import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './PortInfo.css'
import axios from 'axios';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

import InputElement from './InputElement';

const PortInfo = ({handleSetNewHackData}) => {

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
        },
        patchportdesc: "Indefinido"
    })

    const [departments, setDepartments] = useState([
        {
            id: 1,
            departName: "Carregando...",
        },
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

            handleSetNewHackData().then(navigate("/"))
        }

        const handleChangeInputValue = () => {
            return
        }

        const handleUpdateData = async() => {
            const inputPortCode = document.getElementById('input-port-code').value
            const inputPortDesc = document.getElementById('input-port-desc').value
            const inputPatchPortDesc = document.getElementById('input-patch-port-desc').value
            const inputPortDepartment = document.getElementById('department-select').value
            const newData = {...portData, code: inputPortCode, desc: inputPortDesc, departId: inputPortDepartment, patchportdesc: inputPatchPortDesc}

            await axios.put(`http://localhost:3001/port/${params.portId}`, newData)
            handleSetNewHackData().then(navigate('/'))
        }

        const handleChangeSelectValue = () => {
            return ""
        }
            
    return ( 
        <>
       
        <div className="info-container">
        <div>
            <Link to="/" className="react-link">Voltar</Link>
        </div>
            <div className="title-container">
                
                <div className="headers-info">
                <h1>Porta - </h1>
                    <InputElement handleChangeInputValue={handleChangeInputValue} configuration={"input-port-code"} type={"number"} key={portData.code}>{portData.code}</InputElement>
                    <h1>Switch - {portData.switchCode}</h1>
                </div>
            </div>
            <div className="description">
                <h3>Descrição</h3>
                <InputElement handleChangeInputValue={handleChangeInputValue} configuration={"input-port-desc"} type={"text"} key={portData.desc}>{portData.desc}</InputElement>

                <h3>Patchpanel</h3>
            
                <InputElement handleChangeInputValue={handleChangeInputValue} configuration={"input-patch-port-desc"} type={"text"} key={portData.patchportdesc}>{portData.patchportdesc}</InputElement>

            <div className="select" style={{margin: "15px 0px"}}>
                <select id="department-select" onChange={handleChangeSelectValue} className="select-port-department" className="select-element">
                    <option value={portData.departId}>{portData.department.departName}</option>
                    {departments.map((department) => { 
                        if (department.id === portData.departId) {return null}
                        return (<option value={department.id}>{department.departName}</option>)
                    })}
                </select>
            </div>
                
            </div>
            <div className="port-control">
                <BiSave  className="save-icon" onClick={handleUpdateData}/>
                <CgTrash className="delete-icon" onClick={handleDeleteButtonClick}/>
            </div>
        </div>
        </>
     );
}
 
export default PortInfo;