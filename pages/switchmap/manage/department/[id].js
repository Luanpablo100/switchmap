import Container from '../../../../components/container'

import Link from 'next/link';
import Router from 'next/router';

import prismaExecute from '../../../../prisma/commands';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'
import InputComponent from '../../../../components/input';

export default function Home({department}) {

    async function handleUpdateDepartment() {
      const departId = department.id
      const departName = document.getElementById('inputDepartName').value
      const departColor =  document.getElementById('inputDepartColor').value
      console.log(departColor)
      const updateData = {departId: departId, departName: departName, color: departColor}

      fetch('/api/switchmap/update/department', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    }).then(Router.push('/switchmap/manage/department'))
    }

    async function handleDeleteDepartment() {
        const departId = department.id
        
        const deleteData = {departId: departId}

        fetch('/api/switchmap/delete/department', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteData),
        }).then(Router.push('/switchmap/manage/department'))
    }

  return (

      <Container>
        <div>

          <div>
            <Link href={'/switchmap/manage/department'}><a>Voltar</a></Link>
            <InputComponent identify={'inputDepartName'} labelDesc={'Nome do departamento'}>{department.departName}</InputComponent>
            <InputComponent identify={'inputDepartColor'} labelDesc={'Cor da porta'} type={'color'}>{department.departName}</InputComponent>
            <BiSave onClick={handleUpdateDepartment} className='reactIconsBigger'/>
            <CgTrash onClick={handleDeleteDepartment} className='reactIconsBigger'/>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
const departmentData = await prismaExecute.read.department.unique(parseInt(context.params.id))
  return {
    props: {department: departmentData},
  }
}
