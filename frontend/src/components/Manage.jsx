import React from 'react';
import { Link } from 'react-router-dom';
import './Manage.css'

const Manage = ({handleSetNewHackData}) => {
    return ( 
        <div className="container">

            <Link to="/" className="react-link">Voltar</Link>
            <div className="title-container">
                <h1>Gerenciar</h1>
            </div>
            <div className="link-container">
                <Link to="/manage/switch" className="react-link-2">Switchs</Link>
                <Link to="/manage/department" className="react-link-2">Departamentos</Link>
            </div>
        </div>
     );
}
 
export default Manage;