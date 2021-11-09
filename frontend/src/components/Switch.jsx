import React from "react";
import Ports from "./Ports";
import './Switch.css'
import { Link } from "react-router-dom";

const SwitchElement = ({sw}) => {
    let even
    let odd
    {odd = sw.Ports.filter(port => port.code % 2 !== 0)}
    {even = sw.Ports.filter(port => port.code % 2 === 0)}
    return (
        <div className="switch">
            <div>
            {<Ports ports={odd}/>}
            {<Ports ports={even}/>}
            </div>
            <div className={"control"}>
            <h1>{sw.id}</h1>
            <Link to="/port/add">Cadastrar</Link>
            </div>
        </div>
    )
}

export default SwitchElement;