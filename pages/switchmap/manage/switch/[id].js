import Container from '../../../../components/container'

import Link from 'next/link';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

import styles from '../../../../styles/form.module.css'

import prismaExecute from '../../../../prisma/commands';
import InputComponent from '../../../../components/input';

import Select from '../../../../components/select'
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
              <Link href={'/switchmap/manage/switch'}><a className='returnLink'>Voltar</a></Link>
              <InputComponent identify={'inputSwitchCode'} labelDesc={'Código do Switch'}>{sw.codename}</InputComponent>
              <Select data={types} identify={'selectSwType'} labelDesc={'Estilo'} firstValue={sw.typeId}/>
              <div className={styles.itemControls}>
                <button style={{backgroundColor:'transparent', border:'none'}}><BiSave onClick={handleUpdateSwitch} className='reactIconsBigger'/></button>
                <CgTrash onClick={handleDeleteSwitch} className='reactIconsBigger'/>
              </div>
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
