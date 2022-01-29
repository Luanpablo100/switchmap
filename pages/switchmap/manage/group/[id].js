import Container from '../../../../components/container'

import Link from 'next/link';

import prismaExecute from '../../../../prisma/commands';

import styles from '../../../../styles/form.module.css'

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'
import InputComponent from '../../../../components/input';
import updateElement from '../../../../lib/fetch/update';
import deleteElement from '../../../../lib/fetch/delete';

export default function Home({group}) {

    async function handleUpdateGroup(event) {
      event.preventDefault()

      const groupId = group.id
      const groupName = document.getElementById('inputGroupName').value
      const groupColor =  document.getElementById('inputGroupColor').value
      const updateData = {groupId: groupId, groupName: groupName, groupColor: groupColor}

      updateElement('group', updateData)
    }

    async function handleDeleteDepartment() {
        const groupId = group.id
        
        const deleteData = {groupId: groupId}

        deleteElement('group', deleteData)
    }

  return (

      <Container>
        <div>
          <div>
            <form method='POST' onSubmit={handleUpdateGroup}>
              <Link href={'/switchmap/manage/group'}><a className='returnLink'>Voltar</a></Link>
              <InputComponent identify={'inputGroupName'} labelDesc={'Nome do departamento'}>{group.codename}</InputComponent>
              <InputComponent identify={'inputGroupColor'} labelDesc={'Cor do grupo'} type={'color'}>{group.color}</InputComponent>
              <div className={styles.itemControls}>
                <button style={{backgroundColor:'transparent', border:'none'}}><BiSave onClick={handleUpdateGroup} className='reactIconsBigger'/></button>
                <CgTrash onClick={handleDeleteDepartment} className='reactIconsBigger'/>
              </div>
            </form>
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
