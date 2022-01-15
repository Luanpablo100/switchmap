import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

import prismaExecute from '../../../prisma/commands'

import createElement from '../../../lib/fetch/create'

import SelectGroup from '../../../components/selectGroup'

export default function Home({groupsData}) {

  async function handleCreateDepartment(event) {

    event.preventDefault()

    const departName = document.getElementById('inputDepartName').value
    const groupId = document.getElementById('selectGroup').value
    const postData = {departName: departName, groupId: groupId}

    createElement('department', postData)
  }


  return (
      <Container>
        <div>
          <div>
            <Link href={'/switchmap/create/'}><a>Voltar</a></Link>
            <h1>Adicionar departamento</h1>
          </div>
          <div>
            <form method='POST' onSubmit={handleCreateDepartment}>
              <InputComponent labelDesc={"Nome do departamento"} identify={'inputDepartName'}/>
              <SelectGroup identify={'selectGroup'} labelDesc={'Grupo'} datas={groupsData}/>
              <ButtonComponent>Enviar</ButtonComponent>
            </form>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
  const groupsData = await prismaExecute.read.group.all()
  return {
    props: {groupsData},
  }
}
