import styles from '../styles/input.module.css'

export default function InputComponent({name, labelDesc}) {
    return ( 
        <div className={styles.group}>
            <label for={name}>{labelDesc}</label>
            <input className={styles.inputElement} id={name}/>
        </div>
    );
}