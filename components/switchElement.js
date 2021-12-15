import styles from '../styles/switch.module.css'

import Ports from './ports';

export default function SwitchElement({sw}) {

    let even
    let odd
    {odd = sw.Ports.filter(port => port.code % 2 !== 0)}
    {even = sw.Ports.filter(port => port.code % 2 === 0)}
    return (
        <div className={styles.switch}>
            <div>
                {<Ports ports={odd} orientation={"up"} key={`${sw.id}-up`}/>}
                {<Ports ports={even} orientation={"down"} key={`${sw.id}-down`}/>}
            </div>
            <div className={styles.swcode}>
                <h1>{sw.code}</h1>
            </div>
        </div>
    )


    return (
        <div className={styles.switch}>
            <Ports/>
        </div>
    );
}