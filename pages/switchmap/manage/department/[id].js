import Container from '../../../../components/container'

import Link from 'next/link';
import Router from 'next/router';

import prismaExecute from '../../../../prisma/commands';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

export default function Home({department}) {

    async function handleSaveDepartment() {
        return ''
    }

    async function handleDeleteDepartment() {
        const departId = department.id
        
        const deleteData = {departId: departId}

        fetch('/api/delete/department', {
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
          <Link href={'/switchmap/manage/department'}><a>Voltar</a></Link>
          <h1>Nome do departamento: {department.departName}</h1>
          <BiSave onClick={handleSaveDepartment} className='reactIconsBigger'/>
          <CgTrash onClick={handleDeleteDepartment} className='reactIconsBigger'/>
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
