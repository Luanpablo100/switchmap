import React from 'react';
import './Header.css'
import {BsFillPlusSquareFill} from 'react-icons/bs'
import {HiFilter} from 'react-icons/hi'
import {Link} from "react-router-dom"

const HeaderElement = ({handleFilterPorts, departments}) => {

    const handleClickFilterButton = () => {
        const filterDepartId = document.getElementById('department-select').value
        handleFilterPorts(filterDepartId)
    }

    const handleChangeInputValue = () => {
        return ""
    }

    return ( 
        <div className="header-container">
            <h1 style={{marginLeft: "10px"}}>Switchmap</h1>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <HiFilter style={{width:'30px', height: "30px", margin: "10px 10px 10px 0px"}} onClick={handleClickFilterButton}/>
                <div className="select" style={{margin: "15px 0px"}}>
                    <select id="department-select" onChange={handleChangeInputValue} className="select-port-department" className="select-element">
                        {departments.map((department) => { 
                            return (<option value={department.id}>{department.departName}</option>)
                        })}
                    </select>
                </div>
            </div>
            
            <Link to="/port/add" className="icon-link">
                <BsFillPlusSquareFill style={{width:'30px', height: "30px", margin: "10px 10px 10px 0px"}}/>
            </Link>
        </div>
     );
}
 
export default HeaderElement;