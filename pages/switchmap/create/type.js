import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

import Router from 'next/router'

export default function Home() {
  async function submitSwType(event) {
    event.preventDefault()
    const typeName = document.getElementById('inputTypeName').value
    const color1 = document.getElementById('inputTypeColor1').value
    const color2 = document.getElementById('inputTypeColor2').value
    const color3 = document.getElementById('inputTypeColor3').value
    const color4 = document.getElementById('inputTypeColor4').value
    const postData = {typeName: typeName, color1: color1, color2:color2, color3:color3, color4:color4}
    fetch('/api/switchmap/swtype', {
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
            <h1>Adicionar estilo</h1>
          </div>
          <div>
            <form method='POST' onSubmit={submitSwType}>
              <InputComponent labelDesc={"Nome do estilo"} identify={'inputTypeName'}/>
              <InputComponent labelDesc={"Cor de fundo"} identify={'inputTypeColor1'} type={'color'}/>
              <InputComponent labelDesc={"Cor da borda"} identify={'inputTypeColor2'} type={'color'}/>
              <InputComponent labelDesc={"Cor de fundo dos numeros"} identify={'inputTypeColor3'} type={'color'}/>
              <InputComponent labelDesc={"Entorno das portas"} identify={'inputTypeColor4'} type={'color'}/>
              <ButtonComponent>Enviar</ButtonComponent>
            </form>
          </div>
        </div>
      </Container>
  )
}
