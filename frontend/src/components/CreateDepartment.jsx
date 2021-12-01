import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonElement from './Button';
import './CreatePort.css'
import InputElement from './InputElement';

const CreateDepartment = ({handleSetNewDepartmentData, server}) => {

    const navigate = useNavigate()

    const handleCreateDepartmentButtonClick = async () => {
        const inputDepartmentName = (document.getElementById("inputDepartmentName").value)

        if(inputDepartmentName === '' || inputDepartmentName === null) {
            return alert(`Campos necessários estão vazios!`)
        }

        const postData = { departName: inputDepartmentName}
        await axios.post(`http://${server.name}:${server.port}/department/add`, postData)
        handleSetNewDepartmentData().then(navigate("/swichmap"))
    }

    const handleChangeInputValue = () => {
        return
    }

    return ( 

        <div className="add-container">

            <div>
                <Link to="/switchmap/create" className="react-link">Voltar</Link>
                <h1>Adicionar departamento</h1>
            </div>
            <div className="input-container">
                <label htmlFor="inputDepartmentName" >Nome do departamento</label>
                <InputElement configuration={"inputDepartmentName"} type={"text"} handleChangeInputValue={handleChangeInputValue}>{""}</InputElement>

                <ButtonElement onClick={handleCreateDepartmentButtonClick}> Cadastrar</ButtonElement>
            </div>
        </div>
    );
}
 
export default CreateDepartment;