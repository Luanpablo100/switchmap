import styles from '../styles/select.module.css'

export default function SwitchSelect({switchs, identify, labelDesc}) {
    return (
        <div>
            {labelDesc !== undefined ? <label htmlFor={identify}>{labelDesc}</label> : ''}
        <div className={styles.select}>
            <select className={styles.selectDiv} id={identify}>
                {switchs.map(sw => (<option value={sw.id} key={sw.id}>Switch {sw.code} - Hack {sw.rackCode}</option>))}
            </select>
        </div>
        </div>
    )
}