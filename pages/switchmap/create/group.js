import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

import Router from 'next/router'

export default function Home() {
  async function submitGroup(event) {
    event.preventDefault()
    const groupName = document.getElementById('inputGroupName').value
    const groupColor = document.getElementById('inputGroupColor').value
    const postData = {groupName: groupName, color: groupColor}
    fetch('/api/switchmap/group', {
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
            <h1>Adicionar grupo</h1>
          </div>
          <div>
            <form method='POST' onSubmit={submitGroup}>
              <InputComponent labelDesc={"Nome do grupo"} identify={'inputGroupName'}/>
              <InputComponent labelDesc={"Cor do grupo"} identify={'inputGroupColor'} type={'color'}/>
              <ButtonComponent>Enviar</ButtonComponent>
            </form>
          </div>
        </div>
      </Container>
  )
}
