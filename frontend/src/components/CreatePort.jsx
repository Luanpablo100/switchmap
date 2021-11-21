import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonElement from './Button';
import './CreatePort.css'
import InputElement from './InputElement';

const CreatePort = ({handleCreatePort}) => {

    const [departments, setDepartments] = useState([
        {
            id: 1,
            departName: "Admin"
        },
        {
            id: 2,
            departName: "Comercial"
        }
    ])

    useEffect(() => {
        const getDepartments = async () => {
            const { data } = await axios.get('http://localhost:3001/department')
            console.log(data)
            setDepartments(data)
          }
      
          getDepartments()
    }, [])

    const navigate = useNavigate()

    const handleCreatePortButtonClick = async () => {
        const inputPortSwCode = (document.getElementById("inputPortSwCode").value)
        const inputPortCode = (document.getElementById("inputPortCode").value)
        const inputPortDesc = (document.getElementById("inputPortDesc").value)
        const inputPortDepartment = (document.getElementById("department-select").value)
        const postData = { code: inputPortCode, switchCode: inputPortSwCode, portDesc: inputPortDesc, departId: inputPortDepartment}
        await axios.post('http://localhost:3001/port/add', postData)
        handleCreatePort().then(navigate("/"))
    }

    const handleChangeInputValue = () => {
        return
    }

    return ( 

        <div className="add-container">

            <div>
                <Link to="/" className="react-link">Voltar</Link>
                <h1>Adicionar porta</h1>
            </div>
            <div className="input-container">
                <label htmlFor="inputPortSwCode" >Número do Switch</label>
                <InputElement configuration={"inputPortSwCode"} type={"text"} handleChangeInputValue={handleChangeInputValue}></InputElement>

                <label htmlFor="inputPortCode">Número da porta</label>
                <InputElement configuration={"inputPortCode"} type={"text"} handleChangeInputValue={handleChangeInputValue}></InputElement>

                <label htmlFor="department-select">Departamento</label>

                <div className="select">
                    <select name="department-select" id="department-select" className="select-element">

                        {departments.map((department)=> {
                            return <option value={department.id}>{department.departName}</option>
                        })}

                    </select>

                </div>  

                <label htmlFor="inputPortDesc">Descrição</label>
                <InputElement configuration={"inputPortDesc"} type={"text"} handleChangeInputValue={handleChangeInputValue}></InputElement>
                
                <ButtonElement onClick={handleCreatePortButtonClick}> Cadastrar</ButtonElement>
            </div>
        </div>
    );
}
 
export default CreatePort;