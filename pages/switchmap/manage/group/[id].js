import Container from '../../../../components/container'

import Link from 'next/link';
import Router from 'next/router';

import prismaExecute from '../../../../prisma/commands';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'
import InputComponent from '../../../../components/input';

export default function Home({group}) {

    async function handleUpdateGroup() {
      const groupId = group.id
      const groupName = document.getElementById('inputGroupName').value
      const groupColor =  document.getElementById('inputGroupColor').value
      const updateData = {groupId: groupId, groupName: groupName, groupColor: groupColor}

      fetch('/api/switchmap/group', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    }).then(Router.push('/switchmap/manage/group'))
    }

    async function handleDeleteDepartment() {
        const groupId = group.id
        
        const deleteData = {groupId: groupId}

        fetch('/api/switchmap/group', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteData),
        }).then(Router.push('/switchmap/manage/group'))
    }

  return (

      <Container>
        <div>
          <div>
            <Link href={'/switchmap/manage/group'}><a>Voltar</a></Link>
            <InputComponent identify={'inputGroupName'} labelDesc={'Nome do departamento'}>{group.name}</InputComponent>
            <InputComponent identify={'inputGroupColor'} labelDesc={'Cor do grupo'} type={'color'}>{group.color}</InputComponent>
            <BiSave onClick={handleUpdateGroup} className='reactIconsBigger'/>
            <CgTrash onClick={handleDeleteDepartment} className='reactIconsBigger'/>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
const groupData = await prismaExecute.read.group.unique(parseInt(context.params.id))
  return {
    props: {group: groupData},
  }
}
