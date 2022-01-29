import SwitchElement from "./switchElement"

import styles from '../styles/hack.module.css'

export default function SwitchContainer({departments, rack, swTypes}) {
    return (
        <div className={styles.divSwitchs}>
            {
                rack.Switchs.map(sw => (
                    <SwitchElement sw={sw} key={sw.id} departments={departments} types={swTypes}/>
                ))
            }
        </div>
    )
}