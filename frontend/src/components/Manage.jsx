import React from 'react';
import { Link } from 'react-router-dom';
import './Manage.css'

const Manage = () => {
    return ( 
        <div className="container">

            <Link to="/switchmap" className="react-link">Voltar</Link>
            <div className="title-container">
                <h1>Gerenciar</h1>
            </div>
            <div className="link-container">
                <Link to="/switchmap/manage/switch" className="react-link-2">Switchs</Link>
                <Link to="/switchmap/manage/department" className="react-link-2">Departamentos</Link>
            </div>
        </div>
     );
}
 
export default Manage;