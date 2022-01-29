import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

import createElement from '../../../lib/fetch/create'

export default function Home() {

  async function handleCreateRack(event) {
    event.preventDefault()

    const hackCodename = document.getElementById('inputHackCodename').value
    const postData = {codename: hackCodename}

    createElement('hack', postData)
  }

  return (
      <Container>
        <div>
          <div>
            <Link href={'/switchmap/create/'}><a className='returnLink'>Voltar</a></Link>
            <h1>Adicionar hack</h1>
          </div>
          <div>
            <form method='POST' onSubmit={handleCreateRack}>
              <InputComponent labelDesc={"Codinome do hack"} identify={'inputHackCodename'}/>
              <ButtonComponent>Enviar</ButtonComponent>
            </form>
          </div>
        </div>
      </Container>
  )
}
