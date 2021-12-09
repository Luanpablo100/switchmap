import Container from '../../../components/container'

import Link from 'next/link';

import prismaExecute from '../../../prisma/commands';

export default function Home({port}) {
  return (

      <Container>
        <div>
          <Link href={'/switchmap'}><a>Voltar</a></Link>
          <h1>Porta {port.code} - Switch {port.switchCode}</h1>
          <h2>Departamento: {port.department.departName}</h2>
          {console.log(port)}
          <h2>Descrição: {port.desc}</h2>
          <h2>Descrição patch panel: {port.patchportdesc}</h2>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
const portData = await prismaExecute.read.port.unique(parseInt(context.params.id))
  return {
    props: {port: portData},
  }
}
