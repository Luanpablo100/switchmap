import axios from 'axios';
import React  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonElement from './Button';
import './CreatePort.css'
import InputElement from './InputElement';

const CreateSwitch = ({handleSetNewHackData, server}) => {

    const navigate = useNavigate()

    const handleCreateSwitchButtonClick = async () => {
        const inputSwitchCode = (document.getElementById("inputSwitchCode").value)

        if(inputSwitchCode === '' || inputSwitchCode === null) {
            return alert(`Campos necessários estão vazios!`)
        }

        // const inputRackCode = (document.getElementById("inputRackCode").value)
        const postData = { code: inputSwitchCode/*, rackCode: inputRackCode*/}
        await axios.post(`http://${server.name}:${server.port}/switch/add`, postData)
        handleSetNewHackData().then(navigate("/"))
    }

    const handleChangeInputValue = () => {
        return
    }

    return ( 

        <div className="add-container">

            <div>
                <Link to="/create" className="react-link">Voltar</Link>
                <h1>Adicionar Switch</h1>
            </div>
            <div className="input-container">
                <label htmlFor="inputSwitchCode" >Número do Switch</label>
                <InputElement configuration={"inputSwitchCode"} type={"text"} handleChangeInputValue={handleChangeInputValue}>{""}</InputElement>

                {/* <label htmlFor="inputRackCode" >Número do Rack</label>
                <InputElement configuration={"inputRackCode"} type={"text"} handleChangeInputValue={handleChangeInputValue}>{""}</InputElement> */}

                <ButtonElement onClick={handleCreateSwitchButtonClick}> Cadastrar</ButtonElement>
            </div>
        </div>
    );
}
 
export default CreateSwitch;