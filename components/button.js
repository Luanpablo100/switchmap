import styles from '../styles/button.module.css'

export default function ButtonComponent({children}) {
    return ( 
        <div className={styles.buttons}>
            <div className={styles.buttonContainer}>
                <span className={`${styles.btn} ${styles.effect01}`}><span><button type='sumbmit'>{children}</button></span></span>
            </div>
        </div>
     );
}