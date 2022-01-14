import styles from '../styles/select.module.css'

export default function SelectGroup({datas, identify, labelDesc}) {

    return (
        <div>
        {labelDesc !== undefined ? <label htmlFor={identify}>{labelDesc}</label> : ''}
        <div className={styles.select}>
            <select className={styles.selectDiv} id={identify}>
                {datas.map(data => (<option value={data.id} key={data.id}>{data.name}</option>))}
            </select>
        </div>
        </div>
    )
}