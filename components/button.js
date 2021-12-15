import styles from '../styles/button.module.css'

export default function ButtonComponent({children, onFunction}) {
    return ( 
        <button type='submit' className={styles.btnElement} onClick={onFunction}>{children}</button>
     );
}