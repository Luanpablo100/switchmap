import styles from '../styles/select.module.css'

export default function SelectHack({datas, identify, labelDesc}) {
    return (
        <div>
        {labelDesc !== undefined ? <label htmlFor={identify}>{labelDesc}</label> : ''}
        <div className={styles.select}>
            <select className={styles.selectDiv} id={identify}>
                {datas.map(data => (<option value={data.code} key={data.id}>{data.code}</option>))}
            </select>
        </div>
        </div>
    )
}