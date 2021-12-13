import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

export default function Home() {
  async function submitSwitch(event) {
    event.preventDefault()
    const switchCode = document.getElementById('inputSwitchCode').value
    const postData = {switchCode: switchCode}
    fetch('/api/switchmap/add/switch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
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
            <ButtonComponent>Enviar</ButtonComponent>
          </form>
        </div>
      </Container>
  )
}
