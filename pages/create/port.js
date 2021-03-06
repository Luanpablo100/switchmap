import prismaExecute from '../../prisma/commands'

import Link from 'next/link'

import Select from '../../components/select'

import Container from '../../components/container'
import InputComponent from '../../components/input'
import ButtonComponent from '../../components/button'

import { useState, useEffect } from 'react'

import createElement from '../../lib/fetch/create'

export default function Home({departmentData, switchsData, rackData}) {
  const [areMany, setAreMany] = useState(false)
  const [switchs, setSwitchs] = useState(switchsData)
  const [departments, setDepartments] = useState(departmentData)
  
  async function handleCreatePort(event) {
    event.preventDefault()

    if(areMany === true) {

      const portCodeInit = document.getElementById('inputPortCodeInit').value
      const portCodeEnd = document.getElementById('inputPortCodeEnd').value
      const switchCode = document.getElementById('switchSelect').value
      const departId = document.getElementById('departmentSelect').value
      const manyPorts = areMany
      
      const postData = {portCodeInit: portCodeInit, portCodeEnd:portCodeEnd, departId:departId, switchCode: switchCode, manyPorts: manyPorts}
      
      createElement('port', postData)

    } else if(areMany === false) {

      const portCode = document.getElementById('inputPortCode').value
      const switchCode = document.getElementById('switchSelect').value
      const departId = document.getElementById('departmentSelect').value
      const portDesc = document.getElementById('inputPortDesc').value
      const patchPortDesc = document.getElementById('inputPatchPortDesc').value
      const postData = {portCode:portCode, switchCode:switchCode, departId:departId, portDesc: portDesc, patchPortDesc: patchPortDesc}
      
      createElement('port', postData)

    } else {
      alert("Erro no envio!")
    }
  }

  function changeManyPorts() {
    setAreMany(!areMany)
  }


  useEffect(() => {
    let switchmapHackId = localStorage.getItem('switchmapHackId')

    if (switchmapHackId === null || switchmapHackId === undefined) {

      switchmapHackId = 0

    }

    function changeDepartments() {
      const newDepartments = departmentData.filter((department) => {
        return (department.hackId === rackData[switchmapHackId].id) || (department.isRestricted === false)
      })
      setDepartments(newDepartments)
    }

    function changeSwitchs() {
      const newSwitchs = switchs.filter((sw) => {
        return (sw.rackCode === rackData[switchmapHackId].id)
      })
      setSwitchs(newSwitchs)
    }

      changeDepartments()
      changeSwitchs()
  
  }, [])

  return (
      <Container>
        <div>
          <div>
            <Link href={'/create/'}><a className='returnLink'>Voltar</a></Link>
            <h1>Adicionar porta</h1>
          </div>
          <div>
            <form method='POST' onSubmit={handleCreatePort}>
              <label>M??ltiplas portas</label>
              <input type='checkbox' onChange={changeManyPorts}></input>
              {areMany === true 
                ? <> <InputComponent labelDesc={"Da porta..."} identify={'inputPortCodeInit'}/>  <InputComponent labelDesc={"At?? a porta.."} identify={'inputPortCodeEnd'}/></>
                : <InputComponent labelDesc={"N??mero da Porta"} identify={'inputPortCode'}/>
              }

              <Select data={switchs} identify='switchSelect' labelDesc={'Switch'}/>
              <Select data={departments} identify={'departmentSelect'} labelDesc="Departamento"/>
              {areMany === true 
                ? <></>
                : <> 
                    <InputComponent labelDesc={"Descri????o"} identify={'inputPortDesc'}/>
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
  const switchsData = await prismaExecute.read.switch.all()
  const departmentData = await prismaExecute.read.department.all()
  const rackData = await prismaExecute.read.hack.all()
    return {
      props: {departmentData, switchsData, rackData},
    }
  }
  