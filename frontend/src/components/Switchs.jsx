import React from 'react';
import SwitchElement from './Switch';

const SwitchsElements = ({data}) => {
    return (
        <div style={{display: "flex"}}>
            <div>
                {data.map(sw => <SwitchElement sw={sw} key={sw.id}/>)}  
            </div>
        </div>
    );
}
 
export default SwitchsElements;