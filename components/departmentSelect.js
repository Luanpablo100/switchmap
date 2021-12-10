import styles from '../styles/select.module.css'

export default function DepartmentSelect({departments}) {
    return (
        <div className={styles.select}>
            <select className={styles.selectDiv}>
                {departments.map(department => (<option>{department.departName}</option>))}
            </select>
        </div>
    )
}

// <div className="select">
//                     <select name="department-select" id="department-select" className="select-element">

//                         {departments.map((department)=> {
//                             return <option value={department.id}>{department.departName}</option>
//                         })}

//                     </select>

//                 </div> 