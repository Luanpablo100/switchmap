import React from 'react';
import "./Button.css"

const ButtonElement = ({children, onClick, type}) => {
    return ( 
        <div className="buttons" onClick={onClick}>
            <div className="button-container">
                <span className="btn effect01"><span><button type={type}>{children}</button></span></span>
            </div>
        </div>
     );
}
 
export default ButtonElement;