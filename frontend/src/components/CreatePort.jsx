import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreatePort.css'

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

    return ( 

        <div className="add-container">

            <div>
                <Link to="/" className="react-link">Voltar</Link>
                <h1>Adicionar porta</h1>
            </div>
            <div className="input-container">
                <label htmlFor="inputPortSwCode" >Número do Switch</label>
                <input type="text" id="inputPortSwCode" name="inputPortSwCode" required/>
                <label htmlFor="inputPortCode">Número da porta</label>
                <input type="text" id="inputPortCode" name="department-select" required/>
                <label htmlFor="department-select">Departamento</label>



                <select name="department-select" id="department-select">

                {departments.map((department)=> {
                    return <option value={department.id}>{department.departName}</option>
                })}

                </select>



                <label htmlFor="inputPortDesc">Descrição</label>
                <input type="text" id="inputPortDesc" name="inputPortDesc" required/>
                <button onClick={handleCreatePortButtonClick}>Cadastrar</button>
            </div>
        </div>
    );
}
 
export default CreatePort;