import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const PortInfo = () => {
    const navigate = useNavigate()

    const params = useParams()
    const handleGoBack = () => {
        navigate("/")
    }
    return ( 
        <h1>port</h1>
     );
}
 
export default PortInfo;