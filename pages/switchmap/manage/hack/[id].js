import Container from '../../../../components/container'

import Link from 'next/link';
import Router from 'next/router';

import prismaExecute from '../../../../prisma/commands';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'
import InputComponent from '../../../../components/input';

export default function Home({hack}) {

    async function handleUpdateHack() {
      const hackId = hack.id
      const hackCodeName = document.getElementById('inputHackCodename').value
      const updateData = {hackId: hackId, codename: hackCodeName}

      fetch('/api/switchmap/update/hack', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    }).then(Router.push('/switchmap/manage/hack'))
    }

    async function handleDeleteHack() {
        const hackId = hack.id
        
        const deleteData = {hackId: hackId}

        fetch('/api/switchmap/delete/hack', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteData),
        }).then(Router.push('/switchmap/manage/hack'))
    }

  return (

      <Container>
        <div>
          <div>
            <Link href={'/switchmap/manage/hack'}><a>Voltar</a></Link>
            <InputComponent identify={'inputHackCodename'} labelDesc={'Codinome do hack'}>{hack.code}</InputComponent>
            <BiSave onClick={handleUpdateHack} className='reactIconsBigger'/>
            <CgTrash onClick={handleDeleteHack} className='reactIconsBigger'/>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
const hackData = await prismaExecute.read.hack.unique(parseInt(context.params.id))
  return {
    props: {hack: hackData},
  }
}
