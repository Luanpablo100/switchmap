import styles from '../styles/select.module.css'

export default function DepartmentSelect({departments, identify}) {
    return (
        <div className={styles.select}>
            <select className={styles.selectDiv} id={identify}>
                {departments.map(department => (<option value={department.id} key={department.id}>{department.departName}</option>))}
            </select>
        </div>
    )
}