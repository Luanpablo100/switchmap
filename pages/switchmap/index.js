import Container from '../../components/container'
import prismaExecute from '../../prisma/commands'

import {HiFilter} from 'react-icons/hi'

import SwitchElement from '../../components/switchElement'

export default function Home({data}) {
  function isNull(hack) {
    if (hack === undefined) {
      return (
          <Container>
            <h2>Seu banco de dados está vazio!</h2>
          </Container>
        )
    } else if (hack.Switchs[0] === undefined){
      return (
        <Container>
          <h2>Não há switchs para serem exibidos!</h2>
        </Container>
      )
    } else {
      return (

        <Container>
          {
            firstHack.Switchs.map(sw => (
              <SwitchElement sw={sw} key={sw.id}/>
            ))
          }
        </Container>
      )
    }
  } 

  const firstHack = data[0]
  return (
    <>
     {isNull(firstHack)}
    </>
  )
}

export async function getServerSideProps(context) {
  const data = await prismaExecute.read.hack.all()
  return {
    props: {data}, // will be passed to the page component as props
  }
}
