import React from "react";
import './Port.css'
import { useNavigate } from "react-router-dom";


const Port = ({port}) => {
    const navigate = useNavigate()

    function handlePortClick() {
        navigate(`/port/${port.id}`)
    }

    return (
        <div className="sw-port">
            <img src="./img/ethernet.png" alt="" className="ethernet-img" onClick={handlePortClick}/>
            {port.code}
            {/* <input type="text" value={port.code} className={'port-input'} onClick={handlePortClick} readOnly/> */}
        </div>
    )
}

export default Port