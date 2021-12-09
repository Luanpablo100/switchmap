import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

export default function Home() {
  return (
      <Container>
        <div>
          <Link href={'/switchmap/create/'}><a>Voltar</a></Link>
          <h1>Adicionar switch</h1>
        </div>
        <div>
          <form method='POST' action='/api/add/switch'>
            <InputComponent labelDesc={"Número do Switch"} name={'switchCode'}/>
            <ButtonComponent>Enviar</ButtonComponent>
          </form>
        </div>
      </Container>
  )
}
