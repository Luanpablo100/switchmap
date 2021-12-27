import styles from '../styles/port.module.css'

import Link from 'next/link'

import SvgPort from './svgPort'

export default function Port({port, orientation, departments}) {
    let portDepartment
    if(departments !== undefined) {
        portDepartment = departments.find(department => department.id === port.departId)
    }

    return (
        <Link href={`/switchmap/port/${port.id}`}>
            <div className={`${styles.swport} ${orientation}`}>
                <SvgPort fill={portDepartment.color}/>
                {port.code}
            </div>
        </Link>
    )
}
