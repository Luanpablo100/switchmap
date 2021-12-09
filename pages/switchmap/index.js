import Container from '../../components/container'
import prismaExecute from '../../prisma/commands'

import SwitchElement from '../../components/switchElement'

export default function Home({data}) {
  const firstHack = data[0]
  return (
      <Container>
        {firstHack.Switchs.map(sw => (
          <SwitchElement sw={sw} key={sw.id}/>
        )
        )}
      </Container>
  )
}

export async function getServerSideProps(context) {
  const data = await prismaExecute.read.hack.all()
  return {
    props: {data}, // will be passed to the page component as props
  }
}
