import React from 'react';
import SwitchElement from './Switch';
import {BiFilterAlt} from 'react-icons/bi'

const SwitchsElements = ({data, handleFilterPorts}) => {
    return (
        
        <div style={{display: "flex"}}>
            <div style={{backgroundColor:"red", width: "90px", height: "220px"}}>
                <div>
                    <label htmlFor="">Tecnologia da Informação</label>
                    <input type="checkbox"/>
                    <BiFilterAlt style={{width: "35px", height:"35px", cursor: "pointer"}} onClick={handleFilterPorts}/>
                </div>
            </div>
        
        <div>
            {data.map(sw => <SwitchElement sw={sw} key={sw.id}/>)}  
        </div>
        </div>
    );
}
 
export default SwitchsElements;