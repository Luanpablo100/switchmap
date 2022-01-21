import Container from '../../../../components/container'

import Link from 'next/link';

import prismaExecute from '../../../../prisma/commands';

import updateElement from '../../../../lib/fetch/update';
import deleteElement from '../../../../lib/fetch/delete';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'
import InputComponent from '../../../../components/input';
import Select from '../../../../components/select';

export default function Home({department, groups}) {

    async function handleUpdateDepartment(event) {
      event.preventDefault()

      const departId = department.id
      const departName = document.getElementById('inputDepartName').value
      const groupId =  document.getElementById('selectGroup').value
      const updateData = {departId: departId, departName: departName, groupId: groupId}

      updateElement('department', updateData)
    }

    async function handleDeleteDepartment() {
        const departId = department.id
        
        const deleteData = {departId: departId}

        deleteElement('department', deleteData)
    }

  return (

      <Container>
        <div>
          <div>
            <form method='POST' onSubmit={handleUpdateDepartment}>
              <Link href={'/switchmap/manage/department'}><a>Voltar</a></Link>
              <InputComponent identify={'inputDepartName'} labelDesc={'Nome do departamento'}>{department.codename}</InputComponent>
              <Select labelDesc={'Grupo'} data={groups} identify={'selectGroup'}/>
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
  return {
    props: {department: departmentData, groups: groupsData},
  }
}
