import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SwitchList = ({switchdata}) => {

    const navigate = useNavigate()

    return ( 
        <>
        <h1>Gerenciar switchs</h1>
        <div>
            {switchdata.map(sw => {
                return (
                    <div className="switch-div" style={{width: '50px', height: '50px', backgroundColor: 'red'}}>
                        <Link to={`/switch/${sw.id}`}>{sw.code}</Link>
                    </div>
                )
            })}
        </div>
        </>
     );
}
 
export default SwitchList;