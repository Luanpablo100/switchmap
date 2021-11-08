import React from 'react';
import SwitchElement from './Switch';

const SwitchsElements = ({data}) => {
    return (
        <> 
        {console.log(data)}
        {data.map(sw => <SwitchElement sw={sw}/>)}
        </>
    );
}
 
export default SwitchsElements;