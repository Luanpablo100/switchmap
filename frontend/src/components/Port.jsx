import React from "react";
import './Port.css'
import { useNavigate } from "react-router-dom";


const Port = ({port}) => {
    const navigate = useNavigate()

    function portMessage() {
        alert(`Descrição da porta ${port.code}: ${port.desc}`)
    }

    function handlePortClick() {
        navigate(`/${port.id}`)
    }

    return (
        <div className="sw-port">
            <input type="text" value={port.code} className={'port-input'} onClick={handlePortClick} readOnly/>
        </div>
    )
}

export default Port