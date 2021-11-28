import React, { useEffect } from 'react';

import './InputElement.css'

const InputElement = ({children, configuration, handleChangeInputValue, type}) => {

    const setInputValue = () => {
        const actualInput = document.getElementById(configuration)
        actualInput.value = children
    }   

    useEffect(() => {
        setInputValue()
      }, [])

    return ( 
        <div className="group">      
            <input type={type} required id={configuration} onChange={handleChangeInputValue} className="input-text-input-element"/>
            <label className="label-input-element"></label>
        </div>
    );
}
 
export default InputElement;