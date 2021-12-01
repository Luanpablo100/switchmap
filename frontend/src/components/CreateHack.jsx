import axios from 'axios';
import React  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonElement from './Button';
import './CreatePort.css'
import InputElement from './InputElement';

const CreateHack = ({handleSetNewHackData, server}) => {

    const navigate = useNavigate()

    const handleCreateHackButtonClick = async () => {
        const inputHackNumber = (document.getElementById("inputHackNumber").value)

        if(inputHackNumber === '' || inputHackNumber === null) {
            return alert(`Campos necessários estão vazios!`)
        }

        const postData = { rackId: inputHackNumber}
        await axios.post(`http://${server.name}:${server.port}/hack/add`, postData)
        handleSetNewHackData().then(navigate("/"))
    }

    const handleChangeInputValue = () => {
        return
    }

    return ( 

        <div className="add-container">

            <div>
                <Link to="/create" className="react-link">Voltar</Link>
                <h1>Adicionar hack</h1>
            </div>
            <div className="input-container">
                <form action="">
                    <label htmlFor="inputHackNumber" >Número do rack</label>
                    <InputElement configuration={"inputHackNumber"} type={"text"} handleChangeInputValue={handleChangeInputValue}>{""}</InputElement>

                    <ButtonElement onClick={handleCreateHackButtonClick}> Cadastrar</ButtonElement>
                </form>
            </div>
        </div>
    );
}
 
export default CreateHack;