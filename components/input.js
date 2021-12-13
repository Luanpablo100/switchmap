import styles from '../styles/input.module.css'

export default function InputComponent({labelDesc, identify, children}) {
    function handleInputValue() {
        document.getElementById(identify).value = children
    } 

    return ( 
        <div className={styles.group}>
            <label htmlFor={identify}>{labelDesc}</label>
            <input className={styles.inputElement} id={identify} />
        </div>

    );
}