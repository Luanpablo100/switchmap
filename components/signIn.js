import { useMsal } from '@azure/msal-react';

import styles from '../styles/login.module.css'

export default function SignIn() {
	const { instance } = useMsal();

    return (
        <>
			<div className={styles.container}>
				<div className={styles.leftDiv}>
					<h1>Switchmap</h1>
					<img src='/icon.svg'></img>
				</div>
				<div className={styles.rightDiv}>
					<div className='styles.rightDivText'>
						<h1>Faça logon</h1>
						<h3>Com sua conta corporativa</h3>
					</div>
					<img src='/images/microsoft.png'/>
					<button onClick={() => instance.loginRedirect()} className={styles.loginButton}>Entrar</button>
				</div>
			</div>
        </>
    )
}