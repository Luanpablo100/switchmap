import styles from '../styles/select.module.css'
import Link from 'next/link'

export default function DepartmentSelect({departments, identify}) {
    function isNull(departments) {
        if(departments[0] === undefined) {
            return (
                <>
                    <div className={styles.noDepartmentAlert}>Não existem departamentos!<Link href='/switchmap/create/department'><a className={styles.createLink}>Criar</a></Link></div>    
                </>
            )
        } else {
            return (

                <div className={styles.select}>
                    <select className={styles.selectDiv} id={identify}>
                        {departments.map(department => (<option value={department.id} key={department.id}>{department.departName}</option>))}
                    </select>
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