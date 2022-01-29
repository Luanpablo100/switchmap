import Container from '../../../../components/container'

import prismaExecute from '../../../../prisma/commands'

import styles from '../../../../styles/list.module.css'

import Link from 'next/link'

export default function Home({groups}) {
  return (
      <Container>
        <div className={styles.content}>

          <div>
            <Link href={'/switchmap/manage'}><a className='returnLink'>Voltar</a></Link>
            <h1>Gerenciar grupos</h1>
          </div>

          <div className={styles.listDiv}>
              {groups.map(group => (<Link href={`/switchmap/manage/group/${group.id}`} key={group.id}><div className={styles.listElementDiv}><p className={styles.elementName}>{group.codename}</p></div></Link>))}
          </div>
          
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
    const groupsData = await prismaExecute.read.group.all()
      return {
        props: {groups: groupsData},
    }
}
    