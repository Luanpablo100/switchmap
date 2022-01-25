import Container from '../../../../components/container'

import Link from 'next/link';

import prismaExecute from '../../../../prisma/commands';

import updateElement from '../../../../lib/fetch/update';
import deleteElement from '../../../../lib/fetch/delete';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'
import InputComponent from '../../../../components/input';
import Select from '../../../../components/select';

import { useEffect, useState } from 'react';

export default function Home({department, groups, rackData}) {

  const [restricted, setRestricted] = useState(department.isRestricted)

    async function handleUpdateDepartment(event) {
      event.preventDefault()

      const departId = department.id
      const departName = document.getElementById('inputDepartName').value
      const groupId =  document.getElementById('selectGroup').value
      let hackId

      if(restricted === true) {
        hackId = document.getElementById('selectRack').value
      } else {
        hackId = department.hackId
      }

      const updateData = {departId: departId, departName: departName, groupId: groupId, isRestricted: restricted, hackId: hackId}

      updateElement('department', updateData)
    }

    async function handleDeleteDepartment() {
        const departId = department.id
        
        const deleteData = {departId: departId}

        deleteElement('department', deleteData)
    }

    function changeRestricted(event) {
      setRestricted(!restricted)
      event.target.checked = !restricted
    }

    useEffect(() => {
      let inputRestricted = document.getElementById('input-restricted')
      inputRestricted.checked = department.isRestricted
    }, [])

  return (

      <Container>
        <div>
          <Link href={'/switchmap/manage/department'}><a>Voltar</a></Link>
          <div>
            <form method='POST' onSubmit={handleUpdateDepartment}>
              <label>É restrito</label>
              <input type={'checkbox'} onChange={changeRestricted} id='input-restricted'/>
              <InputComponent identify={'inputDepartName'} labelDesc={'Nome do departamento'}>{department.codename}</InputComponent>
              <Select labelDesc={'Grupo'} data={groups} identify={'selectGroup'} firstValue={department.groupId}/>
              {restricted === true 
                ? <Select data={rackData} labelDesc={"Exibir apenas no rack"} identify={'selectRack'}/>
                : ''
              }
              <button style={{backgroundColor:'transparent', border:'none'}}><BiSave onClick={handleUpdateDepartment} className='reactIconsBigger'/></button>
              <CgTrash onClick={handleDeleteDepartment} className='reactIconsBigger'/>
            </form>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
const departmentData = await prismaExecute.read.department.unique(parseInt(context.params.id))
const groupsData = await prismaExecute.read.group.all()
const rackData = await prismaExecute.read.hack.all()
  return {
    props: {department: departmentData, groups: groupsData, rackData},
  }
}
