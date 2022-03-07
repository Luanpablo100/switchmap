import styles from '../styles/port.module.css'

import Link from 'next/link'

import SvgPort from './svgPort'

export default function Port({port, orientation, departments, swStyle}) {
    // console.log(departments)
    let portDepartment
    if(departments !== undefined) {
        portDepartment = departments.find(department => department.id === port.departId)
    }

    return (
        <Link href={`/switchmap/port/${port.id}`}>
            <div className={`${styles.swport} ${orientation}`} style={{backgroundColor: swStyle.color3, color: swStyle.color5}}>
                <SvgPort fill={portDepartment.group === undefined ? '#null' : portDepartment.group.color} key={portDepartment.id} desc={port.desc} border={swStyle.color4}/>
                {port.codename}
            </div>
        </Link>
    )
}
