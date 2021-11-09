import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreatePort.css'

const CreatePort = ({data}) => {
    const navigate = useNavigate()

    async function handleAddPort() {
        const inputPortSwCode = (document.getElementById("inputPortSwCode").value)
        const inputPortCode = (document.getElementById("inputPortCode").value)
        const inputPortDesc = (document.getElementById("inputPortDesc").value)
        const postData = { code: inputPortCode, switchCode: inputPortSwCode, portDesc: inputPortDesc }
        await axios.post('http://localhost:3001/port/add', postData).then(navigate('/'))
    }


    return ( 

        <div className="add-container">

            <div>
                <Link to="/">Voltar</Link>
                <h1>Adicionar porta</h1>
            </div>
            <div className="input-container">
                <label htmlFor="inputPortSwCode" >Número do Switch</label>
                <input type="text" id="inputPortSwCode" name="inputPortSwCode" required/>
                <label htmlFor="inputPortCode">Número da porta</label>
                <input type="text" id="inputPortCode" name="inputPortCode" required/>
                <label htmlFor="inputPortDesc">Descrição</label>
                <input type="text" id="inputPortDesc" name="inputPortDesc" required/>
                <button onClick={handleAddPort}>Cadastrar</button>
            </div>
        </div>
    );
}
 
export default CreatePort;