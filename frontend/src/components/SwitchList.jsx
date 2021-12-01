import React from 'react';
import { Link } from 'react-router-dom';
import './SwitchList.css'

const SwitchList = ({switchdata}) => {

    return ( 
        <div className="container">
            <Link to="/switchmap/manage" className="react-link">Voltar</Link>
            <div className="title-container">
                <h1>Gerenciar switchs</h1>
            </div>
            <div className="switch-list">
                {switchdata.map(sw => {
                    return (
                        <Link to={`/switchmap/switch/${sw.id}`} className={"switch-div"}>
                            <p className="switch-name">Switch</p>
                            <p className='switch-code'>
                                {sw.code}
                            </p>
                        </Link>
                        // <div className="switch-div">
                        // </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default SwitchList;