import Container from '../../../../components/container'

import Link from 'next/link';
import Router from 'next/router';

import prismaExecute from '../../../../prisma/commands';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'
import InputComponent from '../../../../components/input';

export default function Home({type}) {

    async function handleUpdateType() {
      const typeId = type.id
      const typeName = document.getElementById('inputTypeName').value
      const color1 =  document.getElementById('inputTypeColor1').value
      const color2 =  document.getElementById('inputTypeColor2').value
      const color3 =  document.getElementById('inputTypeColor3').value
      const updateData = {typeId: typeId, typeName: typeName, color1: color1, color2: color2, color3: color3}

      fetch('/api/switchmap/update/swtype', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    }).then(Router.push('/switchmap/manage/type'))
    }

    async function handleDeleteType() {
        const typeId = type.id
        
        const deleteData = {typeId: typeId}

        fetch('/api/switchmap/delete/swtype', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteData),
        }).then(Router.push('/switchmap/manage/type'))
    }

  return (

      <Container>
        <div>
          <div>
            <Link href={'/switchmap/manage/type'}><a>Voltar</a></Link>
            <InputComponent identify={'inputTypeName'} labelDesc={'Nome do departamento'}>{type.name}</InputComponent>
            <InputComponent identify={'inputTypeColor1'} labelDesc={'Cor de fundo'} type={'color'}>{type.color1}</InputComponent>
            <InputComponent identify={'inputTypeColor2'} labelDesc={'Cor da borda'} type={'color'}>{type.color2}</InputComponent>
            <InputComponent identify={'inputTypeColor3'} labelDesc={'Cor de fundo das portas'} type={'color'}>{type.color3}</InputComponent>
            <BiSave onClick={handleUpdateType} className='reactIconsBigger'/>
            {console.log(type)}
            <CgTrash onClick={handleDeleteType} className='reactIconsBigger'/>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
const typeData = await prismaExecute.read.switchType.unique(parseInt(context.params.id))
  return {
    props: {type: typeData},
  }
}
