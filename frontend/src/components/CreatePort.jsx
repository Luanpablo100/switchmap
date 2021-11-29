import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonElement from './Button';
import './CreatePort.css'
import InputElement from './InputElement';

const CreatePort = ({handleSetNewHackData, server}) => {

    const [departments, setDepartments] = useState([
        {
            id: 1,
            departName: "Carregando..."
        },
    ])

    useEffect(() => {
        const getDepartments = async () => {
            const { data } = await axios.get(`http://${server.name}:${server.port}/department`)
            setDepartments(data)
          }
      
          getDepartments()
    }, [])

    const navigate = useNavigate()

    const handleCreatePortButtonClick = async () => {
        const inputPortSwCode = (document.getElementById("inputPortSwCode").value)
        const inputPortCode = (document.getElementById("inputPortCode").value)
        const inputPortDesc = (document.getElementById("inputPortDesc").value)
        const inputPortPatchPortDesc = (document.getElementById("inputPortPatchPortDesc").value)
        const inputPortDepartment = (document.getElementById("department-select").value)
        const postData = { code: inputPortCode, switchCode: inputPortSwCode, portDesc: inputPortDesc, departId: inputPortDepartment, patchportdesc: inputPortPatchPortDesc}
        await axios.post(`http://${server.name}:${server.port}/port/add`, postData)
        handleSetNewHackData().then(navigate("/"))
    }

    const handleChangeInputValue = () => {
        return
    }

    return (

        <div className="add-container">

            <Link to="/create" className="react-link">Voltar</Link>
            <div className="title-container">
                <h1>Adicionar porta</h1>
            </div>
            <div className="input-container">
                <label htmlFor="inputPortSwCode" >Número do Switch</label>
                <InputElement configuration={"inputPortSwCode"} type={"text"} handleChangeInputValue={handleChangeInputValue}>{""}</InputElement>

                <label htmlFor="inputPortCode">Número da porta</label>
                <InputElement configuration={"inputPortCode"} type={"text"} handleChangeInputValue={handleChangeInputValue}>{""}</InputElement>

                <label htmlFor="inputPortPatchPortDesc">Patch panel</label>
                <InputElement configuration={"inputPortPatchPortDesc"} type={"text"} handleChangeInputValue={handleChangeInputValue}>{""}</InputElement>

                <label htmlFor="department-select">Departamento</label>

                <div className="select">
                    <select name="department-select" id="department-select" className="select-element">

                        {departments.map((department)=> {
                            return <option value={department.id}>{department.departName}</option>
                        })}

                    </select>

                </div>  

                <label htmlFor="inputPortDesc">Descrição</label>
                <InputElement configuration={"inputPortDesc"} type={"text"} handleChangeInputValue={handleChangeInputValue}>{""}</InputElement>
                
                <ButtonElement onClick={handleCreatePortButtonClick}> Cadastrar</ButtonElement>
            </div>
        </div>
    );
}
 
export default CreatePort;