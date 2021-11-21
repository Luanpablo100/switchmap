import React from 'react';
import './Header.css'
import {BsFillPlusSquareFill} from 'react-icons/bs'
import {Link} from "react-router-dom"

const HeaderElement = () => {
    return ( 
        <div className="header-container">
            <h1 style={{marginLeft: "10px"}}>Switchmap</h1>
            <Link to="/port/add" className="icon-link">
                <BsFillPlusSquareFill style={{width:'30px', height: "30px", margin: "10px 10px 10px 0px"}}/>
            </Link>
        </div>
     );
}
 
export default HeaderElement;