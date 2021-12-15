import Container from '../../../components/container'
import Link from 'next/link'
import Router from 'next/router'
import InputComponent from '../../../components/input'
import SwitchSelect from '../../../components/switchSelect'
import ButtonComponent from '../../../components/button'
import DepartmentSelect from '../../../components/departmentSelect'
import prismaExecute from '../../../prisma/commands'

export default function Home({departments, switchs}) {

  async function submitSwitch(event) {
    event.preventDefault()
    const portCode = document.getElementById('inputPortCode').value
    const switchCode = document.getElementById('switchSelect').value
    const departId = document.getElementById('departmentSelect').value
    const portDesc = document.getElementById('inputPortDesc').value
    const patchPortDesc = document.getElementById('inputPatchPortDesc').value
    const postData = {portCode:portCode, switchCode:switchCode, departId:departId, portDesc: portDesc, patchPortDesc: patchPortDesc}
    fetch('/api/switchmap/add/port', {
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
            <SwitchSelect switchs={switchs} identify='switchSelect'/>
            <DepartmentSelect departments={departments} identify={'departmentSelect'}/>
            <InputComponent labelDesc={"Descrição"} identify={'inputPortDesc'}/>
            <InputComponent labelDesc={"Desc. Patch Panel"} identify={'inputPatchPortDesc'}/>
            <ButtonComponent>Enviar</ButtonComponent>
          </form>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
  const switchs = await prismaExecute.read.switch.all()
  const departData = await prismaExecute.read.department.all()
    return {
      props: {departments: departData, switchs: switchs},
    }
  }
  