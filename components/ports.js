import Port from './port';
import styles from '../styles/ports.module.css'

export default function Ports({ports, orientation, departments}) {
    return (
        <div className={styles.ports}>
            {ports.map((port) => (<Port port={port} key={port.id} orientation={orientation} departments={departments}/>))}
        </div>
    )

}