import styles from '../styles/switch.module.css'

import Ports from './ports';

export default function SwitchElement({sw, departments, types}) {

    let even
    let odd
    {odd = sw.Ports.filter(port => port.code % 2 !== 0)}
    {even = sw.Ports.filter(port => port.code % 2 === 0)}

    const ordernedOdd = odd.sort((a,b) => a.code - b.code)
    const ordernedEven = even.sort((a,b) => a.code - b.code)

    const swStyle = types.find(type =>  type.id === sw.typeId)
    
    return (
        <div className={styles.switch} style={{backgroundColor: swStyle.color1, border: `${swStyle.color2} 2px solid`}}>
            <div>
                {<Ports ports={ordernedOdd} orientation={"up"} key={`${sw.id}-up`} departments={departments} swStyle={swStyle}/>}
                {<Ports ports={ordernedEven} orientation={"down"} key={`${sw.id}-down`} departments={departments} swStyle={swStyle}/>}
            </div>
            <div className={styles.swcode}>
                <h1>{sw.codename}</h1>
            </div>
        </div>
    )
}