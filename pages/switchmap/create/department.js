import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

import Router from 'next/router'

export default function Home() {
  async function submitSwitch(event) {
    event.preventDefault()
    const departName = document.getElementById('inputDepartName').value
    const departColor = document.getElementById('inputDepartColor').value
    const postData = {departName: departName, color: departColor}
    fetch('/api/switchmap/add/department', {
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
          <h1>Adicionar departamento</h1>
        </div>
        <div>
          <form method='POST' onSubmit={submitSwitch}>
            <InputComponent labelDesc={"Nome do departamento"} identify={'inputDepartName'}/>
            <InputComponent labelDesc={"Cor da porta"} identify={'inputDepartColor'} type={'color'}/>
            <ButtonComponent>Enviar</ButtonComponent>
          </form>
        </div>
      </Container>
  )
}
