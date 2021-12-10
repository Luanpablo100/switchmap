import Container from '../../../components/container'
import Link from 'next/link'
import Router from 'next/router'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

export default function Home() {
  async function submitSwitch(event) {
    event.preventDefault()
    const portCode = document.getElementById('inputPortCode').value
    const switchCode = document.getElementById('inputSwitchCode').value
    const departId = document.getElementById('inputDepartId').value
    const portDesc = document.getElementById('inputPortDesc').value
    const patchPortDesc = document.getElementById('inputPatchPortDesc').value
    const postData = {portCode:portCode, switchCode:switchCode, departId:departId, portDesc: portDesc, patchPortDesc: patchPortDesc}
    fetch('/api/add/port', {
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
            <InputComponent labelDesc={"Número da Porta"} identify={'inputPortCode'}/>
            <InputComponent labelDesc={"Número do Switch"} identify={'inputSwitchCode'}/>
            <InputComponent labelDesc={"Departamento"} identify={'inputDepartId'}/>
            <InputComponent labelDesc={"Descrição"} identify={'inputPortDesc'}/>
            <InputComponent labelDesc={"Desc. Patch Panel"} identify={'inputPatchPortDesc'}/>
            <ButtonComponent>Enviar</ButtonComponent>
          </form>
        </div>
      </Container>
  )
}