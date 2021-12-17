import styles from '../styles/select.module.css'
import Link from 'next/link'

export default function DepartmentSelect({departments, identify, labelDesc, portDeparment}) {

    let portDepartmentName
    if(departments !== undefined) {
        portDepartmentName = departments.find(department => department.id === portDeparment)
    }


    function isNull(departments) {
        if(departments[0] === undefined) {
            return (
                <>
                    <div className={styles.noDepartmentAlert}>Não existem departamentos!<Link href='/switchmap/create/department'><a className={styles.createLink}>Criar</a></Link></div>    
                </>
            )
        } else {
            return (
                <div>
                    {labelDesc !== undefined ? <label htmlFor={identify}>{labelDesc}</label> : ''}

                    <div className={styles.select}>

                        <select className={styles.selectDiv} id={identify}>
                            {portDeparment !== undefined ? <option value={portDepartmentName.id}>{portDepartmentName.departName}</option> : null}
                            {departments.map(department => {
                                if (portDepartmentName !== undefined && department.id === portDepartmentName.id) {return null}
                                return <option value={department.id} key={department.id}>{department.departName}</option>
                            })}
                        </select>

                    </div>
                </div>
            )
        }
    }

    return (
        
        <>
            {isNull(departments)}
        </>
    )
}
