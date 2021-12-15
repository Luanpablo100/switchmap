
import Container from '../../../components/container'

import styles from '../../../styles/list.module.css'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
      <Container>
        <div>
          <Link href={'/switchmap'}><a>Voltar</a></Link>
          <h1>Gerenciar</h1>
        </div>
        <div className={styles.listDiv}>
          <Link href='/switchmap/manage/hack'><a><div className={styles.linkDiv}><Image src='/images/data-server.png' width={400} height={400}/>Hack</div></a></Link>
          <Link href='/switchmap/manage/department'><a><div className={styles.linkDiv}><Image src='/images/meeting-room.png' width={400} height={400}/>Departamento</div></a></Link>
          <Link href='/switchmap/manage/switch'><a><div className={styles.linkDiv}><Image src='/images/switch.png' width={400} height={400}/>Switch</div></a></Link>
        </div>
      </Container>
  )
}
