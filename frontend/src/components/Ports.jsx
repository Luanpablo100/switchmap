import React from "react";
import './Ports.css'
import Port from './Port'

const Ports = ({ports, orientation}) => {
    return (
        <div className={`ports ${orientation}`}>
            {ports.map(port => <Port port={port} key={port.id}/>) }
        </div>
    )
}

export default Ports