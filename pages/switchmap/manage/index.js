
import Container from '../../../components/container'

import styles from '../../../styles/list.module.css'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
      <Container>
        <div className={styles.content}>
          <div>
            <Link href={'/switchmap'}><a>Voltar</a></Link>
            <h1>Gerenciar</h1>
          </div>
          <div className={styles.listDiv}>
            <Link href='/switchmap/manage/hack'><a><div className={styles.linkDiv}><Image src='/images/data-server.png' width={400} height={400} alt='Server'/>Hack</div></a></Link>
            <Link href='/switchmap/manage/group'><a><div className={styles.linkDiv}><Image src='/images/office-building.png' width={400} height={400} alt='Groups'/>Grupo</div></a></Link>
            <Link href='/switchmap/manage/department'><a><div className={styles.linkDiv}><Image src='/images/meeting-room.png' width={400} height={400} alt='Departments'/>Departamento</div></a></Link>
            <Link href='/switchmap/manage/switch'><a><div className={styles.linkDiv}><Image src='/images/switch.png' width={400} height={400} alt='Switch'/>Switch</div></a></Link>
            <Link href='/switchmap/manage/type'><a><div className={styles.linkDiv}><Image src='/images/color-palette.png' width={400} height={400} alt='Style'/>Estilos</div></a></Link>
          </div>
        </div>
      </Container>
  )
}
