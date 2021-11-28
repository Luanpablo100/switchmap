import React from 'react';
import { Link } from 'react-router-dom';

const Manage = ({handleSetNewHackData}) => {
    return ( 
        <div>
            <h1>Gerenciar</h1>
            <Link to="/manage/switch">Switchs</Link>
            <Link to="/manage/department">Departamentos</Link>
        </div>
     );
}
 
export default Manage;