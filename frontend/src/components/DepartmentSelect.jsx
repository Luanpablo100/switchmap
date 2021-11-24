import React, {useState } from "react";
import axios from "axios";

const DepartmentSelect = ({id}) => {
    const [departments, setDepartments] = useState([
        {
            id: 1,
            departName: "Carregando...",
        }
    ])

    const getDepartments = async () => {
        const { data } = await axios.get('http://localhost:3001/department')
        setDepartments(data)
      } 
      getDepartments()
      
      const handleChangeSelectValue = () => {
        return ""
    }

    return ( 
        <div className="select">
            <select id={id} onChange={handleChangeSelectValue} className="select-port-department" className="select-element">
                {departments.map((department) => { 
                    return (<option value={department.id}>{department.departName}</option>)
                })}
            </select>
        </div>
     );
}
 
export default DepartmentSelect;