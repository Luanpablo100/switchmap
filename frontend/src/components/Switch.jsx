import React from "react";
import Ports from "./Ports";
import './Switch.css'

const SwitchElement = ({sw}) => {
    let even
    let odd
    {odd = sw.Ports.filter(port => port.code % 2 !== 0)}
    {even = sw.Ports.filter(port => port.code % 2 === 0)}
    return (
        <div className="switch">
            <div className="ports-container">
                {<Ports ports={odd} orientation={"up"} key={`${sw.id}-up`}/>}
                {<Ports ports={even} orientation={"down"} key={`${sw.id}-down`}/>}
            </div>
            <div className={"control"}>
                <h1>{sw.code}</h1>
            </div>
        </div>
    )
}

export default SwitchElement;