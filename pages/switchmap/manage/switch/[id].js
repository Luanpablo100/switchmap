import Container from '../../../../components/container'

import Link from 'next/link';
import Router from 'next/router';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

import prismaExecute from '../../../../prisma/commands';
import InputComponent from '../../../../components/input';

export default function Home({sw}) {
    async function handleUpdateSwitch() {
        const switchId = sw.id
        const switchCode = document.getElementById('inputSwitchCode').value
        const updateData = {switchId: switchId, switchCode: switchCode}

        fetch('/api/switchmap/update/switch', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
      }).then(Router.push('/switchmap/manage/switch'))
    }

    async function handleDeleteSwitch() {
        const switchId = sw.id
        
        const deleteData = {switchId: switchId}

        fetch('/api/switchmap/delete/switch', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteData),
        }).then(Router.push('/switchmap'))
    }


  return (

      <Container>
        <div>
          <div>
            <Link href={'/switchmap/manage/switch'}><a>Voltar</a></Link>
            <InputComponent identify={'inputSwitchCode'} labelDesc={'Código do Switch'}>{sw.code}</InputComponent>
            <BiSave onClick={handleUpdateSwitch} className='reactIconsBigger'/>
            <CgTrash onClick={handleDeleteSwitch} className='reactIconsBigger'/>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
const switchData = await prismaExecute.read.switch.unique(parseInt(context.params.id))
  return {
    props: {sw: switchData},
  }
}
