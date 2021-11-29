import React from 'react';
import "./Button.css"

const ButtonElement = ({children, onClick}) => {
    return ( 
        <div className="buttons" onClick={onClick}>
            <div className="button-container">
                <span className="btn effect01"><span>{children}</span></span>
            </div>
        </div>
     );
}
 
export default ButtonElement;