import Container from '../../../../components/container'

import Link from 'next/link';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

import prismaExecute from '../../../../prisma/commands';
import InputComponent from '../../../../components/input';

import SelectGroup from '../../../../components/selectGroup';
import updateElement from '../../../../lib/fetch/update';
import deleteElement from '../../../../lib/fetch/delete';

export default function Home({sw, types}) {

    async function handleUpdateSwitch(event) {
      event.preventDefault()
      
      const switchId = sw.id
      const switchCode = document.getElementById('inputSwitchCode').value
      const swTypeId = document.getElementById('selectSwType').value
      const updateData = {switchId: switchId, switchCode: switchCode, swTypeId: swTypeId}

      updateElement('switch', updateData)
    }

    async function handleDeleteSwitch() {
        const switchId = sw.id
        
        const deleteData = {switchId: switchId}

        deleteElement('switch', deleteData)
    }

  return (

      <Container>
        <div>
          <div>
            <form method='POST' onSubmit={handleUpdateSwitch}>
              <Link href={'/switchmap/manage/switch'}><a>Voltar</a></Link>
              <InputComponent identify={'inputSwitchCode'} labelDesc={'Código do Switch'}>{sw.code}</InputComponent>
              <SelectGroup datas={types} identify={'selectSwType'} labelDesc={'Estilo'}/>
              <button style={{backgroundColor:'transparent', border:'none'}}><BiSave onClick={handleUpdateSwitch} className='reactIconsBigger'/></button>
              <CgTrash onClick={handleDeleteSwitch} className='reactIconsBigger'/>
            </form>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
const switchData = await prismaExecute.read.switch.unique(parseInt(context.params.id))
const typesData = await prismaExecute.read.switchType.all()
  return {
    props: {sw: switchData, types: typesData},
  }
}
