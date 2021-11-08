import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './PortInfo.css'
import axios from 'axios';

const PortInfo = () => {
    const params = useParams()
    
    return ( 
        <div className="info-container">
            <div className="title-container">
                <Link to="/">Voltar</Link>
                {axios.get(`http://localhost:3001/port/${params.portId}`)}
                <h1 className={"title"}>Porta {}</h1>
            </div>
            <div className="description">
                
            </div>
        </div>
     );
}
 
export default PortInfo;