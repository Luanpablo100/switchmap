import React from "react";
import Ports from "./Ports";
import './Switch.css'

const Switch = ({sw}) => {
    let even
    let odd
    {odd = sw.ports.filter(port => port.port % 2 !== 0)}
    {even = sw.ports.filter(port => port.port % 2 === 0)}
    return (
        <div className="switch">
            {<Ports ports={odd}/>}
            {<Ports ports={even}/>}
            {sw.id}
        </div>
    )
}

export default Switch;