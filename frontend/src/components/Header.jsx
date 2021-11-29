import React from 'react';
import './Header.css'
import {BsFillPlusSquareFill} from 'react-icons/bs'
import {HiFilter} from 'react-icons/hi'
import {ImCross} from 'react-icons/im'
import {BsGearFill} from 'react-icons/bs'
import {Link} from "react-router-dom"
import {useEffect, useState } from "react";
import axios from "axios";

const HeaderElement = ({handleFilterPorts, handleCancelFilter, departmentData}) => {

    const handleChangeSelectValue = () => {
        return
    }


    const handleClickFilterButton = () => {

        const filterDepartId = document.getElementById('header-select-department').value
        handleFilterPorts(filterDepartId)
    }

    return ( 
        <div className="header-container">
            <Link to="/" style={{textDecoration: 'none', color: 'white'}}><h1 style={{marginLeft: "10px"}}>Switchmap</h1></Link>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <HiFilter style={{width:'30px', height: "30px", margin: "10px 10px 10px 0px"}} onClick={handleClickFilterButton}/> <ImCross style={{width:'30px', height: "30px", margin: "10px 10px 10px 0px"}} onClick={handleCancelFilter}/>
                <div className="select">
                    <select id='header-select-department' onChange={handleChangeSelectValue} className="select-port-department" className="select-element">
                        {departmentData.map((department) => { 
                             return (<option value={department.id}>{department.departName}</option>)
                        })}
                    </select>
                </div>
            </div>
            <div>
                <Link to="/create" className="icon-link">
                    <BsFillPlusSquareFill style={{width:'30px', height: "30px", margin: "10px 10px 10px 0px"}}/>
                </Link>
                <Link to="/manage" className="icon-link">
                    <BsGearFill style={{width:'30px', height: "30px", margin: "10px 10px 10px 0px"}}/>
                </Link>
            </div>
            
        </div>
     );
}
 
export default HeaderElement;