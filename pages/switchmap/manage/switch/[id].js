import Container from '../../../../components/container'

import Link from 'next/link';
import Router from 'next/router';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

import prismaExecute from '../../../../prisma/commands';
import InputComponent from '../../../../components/input';

export default function Home({sw}) {
    async function handleSaveSwitch() {
        return ''
    }

    async function handleDeleteSwitch() {
        const switchId = sw.id
        
        const deleteData = {switchId: switchId}

        fetch('/api/delete/switch', {
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
          <Link href={'/switchmap/manage/switch'}><a>Voltar</a></Link>
          <InputComponent labelDesc={'Número do Switch'} identify={'inputSwitchCode'}>{sw.code}</InputComponent>
          <BiSave onClick={handleSaveSwitch} className='reactIconsBigger'/>
          <CgTrash onClick={handleDeleteSwitch} className='reactIconsBigger'/>
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
