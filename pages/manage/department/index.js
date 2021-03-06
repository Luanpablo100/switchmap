import Container from '../../../components/container'

import prismaExecute from '../../../prisma/commands'

import styles from '../../../styles/list.module.css'

import Link from 'next/link'

export default function Home({departments}) {
  return (
      <Container>
        <div className={styles.content}>

          <div>
            <Link href={'/manage'}><a className='returnLink'>Voltar</a></Link>
            <h1>Gerenciar departamentos</h1>
          </div>

          <div className={styles.listDiv}>
              {departments.map(department => (<Link href={`/manage/department/${department.id}`} key={department.id}><div className={styles.listElementDiv}><p className={styles.elementName}>{department.codename}</p></div></Link>))}
          </div>
          
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
    const departmentsData = await prismaExecute.read.department.all()
      return {
        props: {departments: departmentsData},
    }
}
    