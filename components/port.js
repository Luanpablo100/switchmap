import styles from '../styles/port.module.css'

import Image from 'next/image'
import Link from 'next/link'

export default function Port({port, orientation, departments}) {
    let portDepartment
    if(departments !== undefined) {
        portDepartment = departments.find(department => department.id === port.departId)
    }

    return (
        <Link href={`/switchmap/port/${port.id}`}>
            <div className={`${styles.swport} ${orientation}`}>
                {portDepartment.departName === 'VAZIO' 
                    ?
                    <Image
                    src={'/images/ethernet-off.png'}
                    alt='Ethernet connection image'
                    width={25}
                    height={25}
                    />
                    : 
                    <Image
                    src={'/ethernet.png'}
                    alt='Ethernet connection image'
                    width={25}
                    height={25}
                    />
                    
                }
                {port.code}
            </div>
        </Link>
    )
}
