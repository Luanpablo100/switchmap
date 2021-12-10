import Container from '../../../../components/container'

import styles from '../../../../styles/list.module.css'

import prismaExecute from '../../../../prisma/commands'

import Link from 'next/link'

export default function Home({switchs}) {
  return (
      <Container>
          <div>
            <Link href={'/switchmap'}><a>Voltar</a></Link>
            <h1>Gerenciar Switchs</h1>
          </div>
          <div className={styles.listDiv}>
              {switchs.map(sw => (<Link href={`/switchmap/manage/switch/${sw.id}`}><div className={styles.switchDiv}>Switch <p className={styles.elementName}> {sw.code}</p></div></Link>))}
          </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
    const switchsData = await prismaExecute.read.switch.all()
      return {
        props: {switchs: switchsData},
    }
}
