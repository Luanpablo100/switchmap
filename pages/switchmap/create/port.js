import Container from '../../../components/container'
import Link from 'next/link'
import Router from 'next/router'
import InputComponent from '../../../components/input'
import SwitchSelect from '../../../components/switchSelect'
import ButtonComponent from '../../../components/button'
import DepartmentSelect from '../../../components/departmentSelect'
import prismaExecute from '../../../prisma/commands'

import { useState } from 'react'

export default function Home({departments, switchs}) {
  const [areMany, setAreMany] = useState(false)
  
  async function submitSwitch(event) {
    event.preventDefault()

    if(areMany === true) {

      const portCodeInit = document.getElementById('inputPortCodeInit').value
      const portCodeEnd = document.getElementById('inputPortCodeEnd').value
      const switchCode = document.getElementById('switchSelect').value
      const departId = document.getElementById('departmentSelect').value
      const manyPorts = areMany
      
      const postData = {portCodeInit: portCodeInit, portCodeEnd:portCodeEnd, departId:departId, switchCode: switchCode, manyPorts: manyPorts}
      fetch('/api/switchmap/add/port', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      }).then(Router.push('/switchmap'))

    } else if(areMany === false) {

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

    } else {
      alert("Erro no envio!")
    }
  }

  function changeManyPorts() {
    setAreMany(!areMany)
  }


  return (
      <Container>
        <div>
          <div>
            <Link href={'/switchmap/create/'}><a>Voltar</a></Link>
            <h1>Adicionar porta</h1>
          </div>
          <div>
            <form method='POST' onSubmit={submitSwitch}>
              <label>Múltiplas portas</label>
              <input type='checkbox' onChange={changeManyPorts}></input>
              {areMany === true 
                ? <> <InputComponent labelDesc={"Da porta..."} identify={'inputPortCodeInit'}/>  <InputComponent labelDesc={"Até a porta.."} identify={'inputPortCodeEnd'}/></>
                : <InputComponent labelDesc={"Número da Porta"} identify={'inputPortCode'}/>
              }

              {/* <InputComponent labelDesc={"Número da Porta"} identify={'inputPortCode'}/> */}
              <SwitchSelect switchs={switchs} identify='switchSelect' labelDesc={'Switch'}/>
              <DepartmentSelect departments={departments} identify={'departmentSelect'} labelDesc="Departamento"/>
              {areMany === true 
                ? <></>
                : <> 
                    <InputComponent labelDesc={"Descrição"} identify={'inputPortDesc'}/>
                    <InputComponent labelDesc={"Desc. Patch Panel"} identify={'inputPatchPortDesc'}/>
                </>
              }
              <ButtonComponent>Enviar</ButtonComponent>
            </form>
          </div>
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
  