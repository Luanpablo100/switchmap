import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

import Router from 'next/router'

export default function Home() {
  async function submitSwitch(event) {
    event.preventDefault()
    const switchCode = document.getElementById('inputSwitchCode').value
    const hackCode = document.getElementById('inputHackCode').value
    const postData = {switchCode: switchCode, hackCode: hackCode}
    fetch('/api/switchmap/add/switch', {
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
          <Link href={'/switchmap/create/'}><a>Voltar</a></Link>
          <h1>Adicionar switch</h1>
        </div>
        <div>
          <form method='POST' onSubmit={submitSwitch}>
            <InputComponent labelDesc={"Número do Switch"} identify={'inputSwitchCode'}></InputComponent>
            <InputComponent labelDesc={"Número do Hack"} identify={'inputHackCode'}></InputComponent>
            <ButtonComponent>Enviar</ButtonComponent>
          </form>
        </div>
      </Container>
  )
}
