import Container from '../../../../components/container'

import prismaExecute from '../../../../prisma/commands'

import styles from '../../../../styles/list.module.css'

import Link from 'next/link'

export default function Home({swtypes}) {
  return (
      <Container>
        <div className={styles.content}>

          <div>
            <Link href={'/switchmap/manage'}><a className='returnLink'>Voltar</a></Link>
            <h1>Gerenciar estilos</h1>
          </div>

          <div className={styles.listDiv}>
              {swtypes.map(type => (<Link href={`/switchmap/manage/type/${type.id}`} key={type.id}><div className={styles.listElementDiv}><p className={styles.elementName}>{type.codename}</p></div></Link>))}
          </div>
          
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
    const typesData = await prismaExecute.read.switchType.all()
      return {
        props: {swtypes: typesData},
    }
}
    