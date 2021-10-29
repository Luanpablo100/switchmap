import React from "react";
import './Port.css'

const Port = ({port}) => {
    return (
        <div className="sw-port">
            {port.port}
        </div>
    )
}

export default Port