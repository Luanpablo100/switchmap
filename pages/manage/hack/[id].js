import Container from '../../../components/container'

import Link from 'next/link';

import prismaExecute from '../../../prisma/commands';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'
import InputComponent from '../../../components/input';
import updateElement from '../../../lib/fetch/update';
import deleteElement from '../../../lib/fetch/delete';

import styles from '../../../styles/form.module.css'

export default function Home({hack}) {

    async function handleUpdateHack(event) {
      event.preventDefault()

      const hackId = hack.id
      const hackCodeName = document.getElementById('inputHackCodename').value
      const updateData = {hackId: hackId, codename: hackCodeName}

      updateElement('hack', updateData)      
    }

    async function handleDeleteHack() {
        const hackId = hack.id
        
        const deleteData = {hackId: hackId}

        deleteElement('hack', deleteData)
    }

  return (

      <Container>
        <div>
          <div>
            <form method='POST' onSubmit={handleUpdateHack}>
              <Link href={'/manage/hack'}><a className='returnLink'>Voltar</a></Link>
              <InputComponent identify={'inputHackCodename'} labelDesc={'Codinome do hack'}>{hack.codename}</InputComponent>
              <div className={styles.itemControls}>
                <button style={{backgroundColor:'transparent', border:'none'}}><BiSave onClick={handleUpdateHack} className='reactIconsBigger'/></button>
                <CgTrash onClick={handleDeleteHack} className='reactIconsBigger'/>
              </div>
            </form>
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
