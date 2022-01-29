import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

import { useState } from 'react'

import prismaExecute from '../../../prisma/commands'

import createElement from '../../../lib/fetch/create'
import Select from '../../../components/select'

export default function Home({groupsData, rackData}) {

  const [isRestricted, setisRestricted] = useState(false)

function changeRestricted() {
  setisRestricted(!isRestricted)
}

async function handleCreateDepartment(event) {
  event.preventDefault()

  const departName = document.getElementById('inputDepartName').value
  const groupId = document.getElementById('selectGroup').value
  let hackId
  
  if(isRestricted === true) {

  hackId = document.getElementById('selectHack').value
    
  } else if(isRestricted === false) {

    hackId = 1
  
  } else {
    alert("Erro no envio!")
  }

  const postData = {departName: departName, groupId: groupId, hackId: hackId, isRestricted: isRestricted}
  createElement('department', postData)
}


  return (
      <Container>
        <div>
          <div>
            <Link href={'/switchmap/create/'}><a className='returnLink'>Voltar</a></Link>
            <h1>Adicionar departamento</h1>
          </div>
          <div>
            <form method='POST' onSubmit={handleCreateDepartment}>
              <label>É restrito</label>
              <input type='checkbox' onChange={changeRestricted}></input>
              <InputComponent labelDesc={"Nome do departamento"} identify={'inputDepartName'}/>
              <Select identify={'selectGroup'} labelDesc={'Grupo'} data={groupsData}/>
              {isRestricted === true 
                ? <Select data={rackData} labelDesc={"Exibir apenas no rack"} identify={'selectHack'}/>
                : ''
              }
              <ButtonComponent>Enviar</ButtonComponent>
            </form>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
  const groupsData = await prismaExecute.read.group.all()
  const rackData = await prismaExecute.read.hack.all()
  return {
    props: {groupsData, rackData},
  }
}
