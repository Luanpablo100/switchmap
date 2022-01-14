import Port from './port';
import styles from '../styles/ports.module.css'

export default function Ports({ports, orientation, departments, swStyle}) {
    return (
        <div className={styles.ports} style={{backgroundColor: swStyle.color3}}>
            {ports.map((port) => (<Port port={port} key={port.id} orientation={orientation} departments={departments}/>))}
        </div>
    )

}