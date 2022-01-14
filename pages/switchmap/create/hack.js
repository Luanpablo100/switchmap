import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

import Router from 'next/router'

export default function Home() {
  async function submitDepartment(event) {
    event.preventDefault()
    const hackCodename = document.getElementById('inputHackCodename').value
    const postData = {codename: hackCodename}
    fetch('/api/switchmap/hack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    }).then(Router.push('/switchmap'))
  }

  return (
      <Container>
        <div>
          <div>
            <Link href={'/switchmap/create/'}><a>Voltar</a></Link>
            <h1>Adicionar hack</h1>
          </div>
          <div>
            <form method='POST' onSubmit={submitDepartment}>
              <InputComponent labelDesc={"Codinome do hack"} identify={'inputHackCodename'}/>
              <ButtonComponent>Enviar</ButtonComponent>
            </form>
          </div>
        </div>
      </Container>
  )
}
