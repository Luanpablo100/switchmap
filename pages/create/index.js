import Container from '../../components/container'
import Link from 'next/link'

import Image from 'next/image'

import styles from '../../styles/list.module.css'

export default function Home() {
  return (
      <Container>
        <div>
          <div>
            <Link href={'/'}><a className='returnLink'>Voltar</a></Link>
            <h1>Criar elementos</h1>
          </div>
          <div className={styles.listDiv}>
            <Link href='/create/hack'><a><div className={styles.linkDiv}><Image src='/images/data-server.png' width={400} height={400} alt='Create hack image'/>Hack</div></a></Link>
            <Link href='/create/group'><a><div className={styles.linkDiv}><Image src='/images/office-building.png' width={400} height={400} alt='Create group image'/>Grupo</div></a></Link>
            <Link href='/create/department'><a><div className={styles.linkDiv}><Image src='/images/meeting-room.png' width={400} height={400} alt='Create department image'/>Departamento</div></a></Link>
            <Link href='/create/switch'><a><div className={styles.linkDiv}><Image src='/images/switch.png' width={400} height={400} alt='Create switch image'/>Switch</div></a></Link>
            <Link href='/create/type' ><a><div className={styles.linkDiv}><Image src='/images/color-palette.png' width={400} height={400} alt='Create type image'/>Estilos</div></a></Link>
            <Link href='/create/port' ><a><div className={styles.linkDiv}><Image src='/images/network-hub.png' width={400} height={400} alt='Create port image'/>Porta</div></a></Link>
          </div>
        </div>
      </Container>
  )
}
