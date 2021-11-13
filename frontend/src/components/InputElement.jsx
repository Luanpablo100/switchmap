import React from 'react';

import './InputElement.css'

const InputElement = ({children, configuration, handleChangeInputValue, type}) => {
    return ( 
        <div className="group">      
            <input type={type} required id={configuration} value={children} onChange={handleChangeInputValue}/>
            <label></label>
        </div>
     );
}
 
export default InputElement;