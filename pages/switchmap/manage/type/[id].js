import Container from '../../../../components/container'

import Link from 'next/link';

import prismaExecute from '../../../../prisma/commands';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'
import InputComponent from '../../../../components/input';
import updateElement from '../../../../lib/fetch/update';
import deleteElement from '../../../../lib/fetch/delete';

export default function Home({type}) {

    async function handleUpdateType(event) {
      event.preventDefault()

      const typeId = type.id
      const typeName = document.getElementById('inputTypeName').value
      const color1 =  document.getElementById('inputTypeColor1').value
      const color2 =  document.getElementById('inputTypeColor2').value
      const color3 =  document.getElementById('inputTypeColor3').value
      const color4 =  document.getElementById('inputTypeColor4').value
      const updateData = {typeId: typeId, typeName: typeName, color1: color1, color2: color2, color3: color3, color4:color4}

      updateElement('swtype', updateData)
    }

    async function handleDeleteType() {
        const typeId = type.id
        
        const deleteData = {typeId: typeId}

        deleteElement('swtype', deleteData)
    }

  return (

      <Container>
        <div>
          <div>
            <form method='POST' onSubmit={handleUpdateType}>
              <Link href={'/switchmap/manage/type'}><a>Voltar</a></Link>
              <InputComponent identify={'inputTypeName'} labelDesc={'Nome do departamento'}>{type.codename}</InputComponent>
              <InputComponent identify={'inputTypeColor1'} labelDesc={'Cor de fundo'} type={'color'}>{type.color1}</InputComponent>
              <InputComponent identify={'inputTypeColor2'} labelDesc={'Cor da borda'} type={'color'}>{type.color2}</InputComponent>
              <InputComponent identify={'inputTypeColor3'} labelDesc={'Cor de fundo dos números'} type={'color'}>{type.color3}</InputComponent>
              <InputComponent identify={'inputTypeColor4'} labelDesc={'Entorno das portas'} type={'color'}>{type.color4}</InputComponent>
              <button style={{backgroundColor:'transparent', border:'none'}}><BiSave onClick={handleUpdateType} className='reactIconsBigger'/></button>
              <CgTrash onClick={handleDeleteType} className='reactIconsBigger'/>
            </form>
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
