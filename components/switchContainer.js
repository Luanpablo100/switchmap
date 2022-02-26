import SwitchElement from "./switchElement"

import styles from '../styles/hack.module.css'

export default function SwitchContainer({departments, rack, swTypes}) {

    const parseSwitchCodename = rack.Switchs.map(sw => {
        const newSw = {...sw, codename: parseInt(sw.codename)}
        return newSw
    })

    const ordernedSwitchs = parseSwitchCodename.sort(function (x, y) {
        return x.codename - y.codename
    })

    console.log(ordernedSwitchs)

    return (
        <div className={styles.divSwitchs}>
            {
                ordernedSwitchs.map(sw => {
                    return <SwitchElement sw={sw} key={sw.id} departments={departments} types={swTypes}/>
                })
            }
        </div>
    )
}