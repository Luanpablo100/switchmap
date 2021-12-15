import Container from '../../../components/container'
import Link from 'next/link'

import Image from 'next/image'

import styles from '../../../styles/list.module.css'

export default function Home() {
  return (
      <Container>
        <div>
          <Link href={'/switchmap'}><a>Voltar</a></Link>
          <h1>Criar elementos</h1>
        </div>
        <div className={styles.listDiv}>
          <Link href='/switchmap/create/hack'><a><div className={styles.linkDiv}><Image src='/images/data-server.png' width={400} height={400}/>Hack</div></a></Link>
          <Link href='/switchmap/create/department'><a><div className={styles.linkDiv}><Image src='/images/meeting-room.png' width={400} height={400}/>Departamento</div></a></Link>
          <Link href='/switchmap/create/switch'><a><div className={styles.linkDiv}><Image src='/images/switch.png' width={400} height={400}/>Switch</div></a></Link>
          <Link href='/switchmap/create/port' ><a><div className={styles.linkDiv}><Image src='/images/network-hub.png' width={400} height={400}/>Porta</div></a></Link>
        </div>
      </Container>
  )
}
