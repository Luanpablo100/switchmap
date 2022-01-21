import styles from '../styles/port.module.css'

import Link from 'next/link'

import SvgPort from './svgPort'

export default function Port({port, orientation, departments, swStyle}) {
    let portDepartment
    if(departments !== undefined) {
        portDepartment = departments.find(department => department.id === port.departId)
    }

    return (
        <Link href={`/switchmap/port/${port.id}`}>
            <div className={`${styles.swport} ${orientation}`} style={{backgroundColor: swStyle.color3}}>
                <SvgPort fill={portDepartment.group === null ? '#null' : portDepartment.group.color} key={portDepartment.id} desc={port.desc} border={swStyle.color4}/>
                {port.codename}
            </div>
        </Link>
    )
}
