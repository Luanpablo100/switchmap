import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

import prismaExecute from '../../../prisma/commands'

import Router from 'next/router'
import SelectGroup from '../../../components/selectGroup'

export default function Home({groupsData}) {
  async function submitDepartment(event) {
    event.preventDefault()
    const departName = document.getElementById('inputDepartName').value
    const groupId = document.getElementById('selectGroup').value
    const postData = {departName: departName, groupId: groupId}
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
          <div>
            <Link href={'/switchmap/create/'}><a>Voltar</a></Link>
            <h1>Adicionar departamento</h1>
          </div>
          <div>
            <form method='POST' onSubmit={submitDepartment}>
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
  console.log(groupsData)
  return {
    props: {groupsData},
  }
}
