import styles from '../styles/select.module.css'

export default function Select({data, identify, labelDesc, firstValue}) {

    let firstOpt
    if(firstValue !== undefined) {
        firstOpt = data.find(value => value.id === firstValue)
    }
    
    return (
        <div>
            {labelDesc !== undefined ? <label htmlFor={identify}>{labelDesc}</label> : ''}
            <div className={styles.select}>
                <select className={styles.selectDiv} id={identify}>
                    {firstOpt !== undefined ? <option value={firstOpt.id}>{firstOpt.codename}</option> : null}
                    {data.map(value => {
                        if (firstOpt !== undefined && value.id === firstOpt.id) {return null}
                        return <option value={value.id} key={value.id}>{value.codename}</option>
                    })}
                </select>
            </div>
        </div>
    )
}