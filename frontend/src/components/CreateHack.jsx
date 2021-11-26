import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonElement from './Button';
import './CreatePort.css'
import InputElement from './InputElement';

const CreateHack = ({handleCreateHack}) => {

    const navigate = useNavigate()

    const handleCreateHackButtonClick = async () => {
        const inputHackNumber = (document.getElementById("inputHackNumber").value)
        const postData = { rackId: inputHackNumber}
        await axios.post('http://localhost:3001/hack/add', postData)
        handleCreateHack().then(navigate("/"))
    }

    const handleChangeInputValue = () => {
        return
    }

    return ( 

        <div className="add-container">

            <div>
                <Link to="/" className="react-link">Voltar</Link>
                <h1>Adicionar hack</h1>
            </div>
            <div className="input-container">
                <label htmlFor="inputHackNumber" >Número do rack</label>
                <InputElement configuration={"inputHackNumber"} type={"text"} handleChangeInputValue={handleChangeInputValue}></InputElement>

                <ButtonElement onClick={handleCreateHackButtonClick}> Cadastrar</ButtonElement>
            </div>
        </div>
    );
}
 
export default CreateHack;