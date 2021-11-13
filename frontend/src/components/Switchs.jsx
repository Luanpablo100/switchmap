import React from 'react';
import SwitchElement from './Switch';

const SwitchsElements = ({data}) => {
    return (
        <> 
        {data.map(sw => <SwitchElement sw={sw} key={sw.id}/>)}
        </>
    );
}
 
export default SwitchsElements;