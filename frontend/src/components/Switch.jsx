import React from "react";
import Ports from "./Ports";
import './Switch.css'

const Switch = ({sw}) => {
    let even
    let odd
    {odd = sw.Ports.filter(port => port.code % 2 !== 0)}
    // sw.Ports.filter(port => {console.log(port)})
    {even = sw.Ports.filter(port => port.code % 2 === 0)}
    return (
        <div className="switch">
            <div>
            {<Ports ports={odd}/>}
            {<Ports ports={even}/>}
            </div>
            <div className={"control"}>
            <h1>{sw.id}</h1>
            {/* <button>Update</button> */}
            </div>
        </div>
    )
}

export default Switch;