import styles from '../styles/input.module.css'
import { useEffect } from 'react';

export default function InputComponent({labelDesc, identify, children, type}) {

    useEffect(()=> {
        const actualInput = document.getElementById(identify)
        if(children === undefined) {
            return actualInput.value = ''
        }
        return actualInput.value = children
    })

    return ( 
        <div className={styles.group}>
            <label htmlFor={identify}>{labelDesc}</label>
            <input className={styles.inputElement} id={identify} type={type ? type : 'text'} autoComplete="off"/>
        </div>

    );
}