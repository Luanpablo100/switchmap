import React from 'react';
import { Link } from 'react-router-dom';
import './DepartList.css'

const DepartList = ({departmentData}) => {

    return ( 
        <div className="container">
            <Link to="/" className="react-link">Voltar</Link>
            <div className="title-container">
                <h1>Gerenciar departamentos</h1>
            </div>
            <div className="switch-list">
                {departmentData.map(department => {
                    return (
                        <Link to={`/department/${department.id}`} className={"department-div"}>
                            {/* <p className="switch-name">Switch</p> */}
                            <p className='department-name'>
                                {department.departName}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </div>
     );
}
 
export default DepartList;