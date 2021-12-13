import styles from '../styles/select.module.css'

export default function Select({datas, identify}) {
    return (
        <div className={styles.select}>
            <select className={styles.selectDiv} id={identify}>
                {datas.map(data => (<option value={data.id} key={data.id}>{data.code}</option>))}
            </select>
        </div>
    )
}