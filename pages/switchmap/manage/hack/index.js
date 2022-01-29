import Container from '../../../../components/container'

import prismaExecute from '../../../../prisma/commands'

import styles from '../../../../styles/list.module.css'

import Link from 'next/link'

export default function Home({hacks}) {
  return (
      <Container>
        <div className={styles.content}>

          <div>
            <Link href={'/switchmap/manage'}><a className='returnLink'>Voltar</a></Link>
            <h1>Gerenciar hacks</h1>
          </div>

          <div className={styles.listDiv}>
              {hacks.map(hack => (<Link href={`/switchmap/manage/hack/${hack.id}`} key={hack.id}><div className={styles.listElementDiv}><p className={styles.elementName}>{hack.codename}</p></div></Link>))}
          </div>
          
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
    const hacksData = await prismaExecute.read.hack.all()
      return {
        props: {hacks: hacksData},
    }
}
    