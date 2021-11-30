import React from 'react';
import { Link } from 'react-router-dom';

const Create = () => {
    return ( 



        <div className="container">

            <Link to="/" className="react-link">Voltar</Link>
            <div className="title-container">
                <h1>Novo</h1>
            </div>
            <div className="link-container">
            <Link to="/port/add" className="react-link-2">Switchport</Link>

            <Link to="/switch/add" className="react-link-2">Switch</Link>
            <Link to="/department/add" className="react-link-2">Departamento</Link>

            </div>
        </div>
     );
}
 
export default Create;