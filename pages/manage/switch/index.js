import Container from '../../../components/container'

import styles from '../../../styles/list.module.css'

import prismaExecute from '../../../prisma/commands'

import Link from 'next/link'

export default function Home({switchs, rackData}) {
  return (
      <Container>
        <div className={styles.content}>
            <div>
              <Link href={'/manage'}><a className='returnLink'>Voltar</a></Link>
              <h1>Gerenciar Switchs</h1>
            </div>
            <div className={styles.listDiv}>
                {switchs.map(sw => {
                  const switchHackCodename = rackData.find(rack => sw.rackCode === rack.id)
                  return (
                  <Link href={`/manage/switch/${sw.id}`} key={sw.id}>
                    <div className={styles.listElementDiv}>
                      <div className={styles.listElementDivChild}>
                        <span>Switch </span> <p className={styles.elementName}>{sw.codename}</p>
                      </div>
                      <div className={styles.listElementDivChild}>
                        <span>Hack: </span> <p className={styles.elementName}>{switchHackCodename.codename}</p>
                      </div>
                    </div>
                  </Link>
                  )
                })}
            </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
    const switchsData = await prismaExecute.read.switch.all()
    const rackData = await prismaExecute.read.hack.all()
      return {
        props: {switchs: switchsData, rackData},
    }
}
