import styles from '../styles/select.module.css'

export default function Select({data, identify, labelDesc, firstValue}) {

    let firstOpt = firstValue !== null ? data.find(value => value.id === firstValue) : null
    console.log(firstOpt)

    return (
        <div>
            {labelDesc !== undefined ? <label htmlFor={identify}>{labelDesc}</label> : ''}
            <div className={styles.select}>
                <select className={styles.selectDiv} id={identify}>
                    {data.map(value => (<option value={value.id} key={value.id}>{value.codename}</option>))}
                </select>
            </div>
        </div>
    )
}