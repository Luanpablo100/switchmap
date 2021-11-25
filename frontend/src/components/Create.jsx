import React from 'react';
import { Link } from 'react-router-dom';

const Create = () => {
    return ( 
        <div>
            <div>
                <Link to="/port/add">Criar porta</Link>
            </div>
            <div>
                <Link to="/switch/add">Criar switch</Link>
            </div>
            <div>
                <Link to="/department/add">Criar departamento</Link>
            </div>
        </div>
     );
}
 
export default Create;