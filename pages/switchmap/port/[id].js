import Container from '../../../components/container'

import InputComponent from '../../../components/input';

import Link from 'next/link';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

import prismaExecute from '../../../prisma/commands';
import DepartmentSelect from '../../../components/departmentSelect';

import updateElement from '../../../lib/fetch/update';
import deleteElement from '../../../lib/fetch/delete';

export default function Home({port, departments}) {

  let portDepartment
  if(departments !== undefined) {
      portDepartment = departments.find(department => department.id === port.departId)
  }


  async function handleUpdatePort(event) {

    event.preventDefault()

    const portId = port.id
    const inputPortCode = document.getElementById('inputPortCode').value
    const inputPortDesc = document.getElementById('inputPortDesc').value
    const inputPatchPortDesc = document.getElementById('inputPatchPortDesc').value
    const inputDepartId = document.getElementById('selectDepartment').value

    const updateData = {portId: portId, portCode: inputPortCode, portDesc: inputPortDesc, patchPortDesc: inputPatchPortDesc, departId: inputDepartId}
    
    updateElement('port', updateData)
}

async function handleDeletePort() {
    const portId = port.id
    
    const deleteData = {portId: portId}

    deleteElement('port', deleteData)
}

  return (
      <Container>
        <div>
          <div>
              <Link href={'/switchmap'}><a>Voltar</a></Link>
            <form method='POST' onSubmit={handleUpdatePort}>
              <InputComponent labelDesc={'Porta'} identify={'inputPortCode'}>{port.code}</InputComponent>
              <InputComponent labelDesc={'Switch'} identify={'inputPortSwitchCode'}>{port.switchCode}</InputComponent>
              <DepartmentSelect departments={departments} identify={'selectDepartment'} portDeparment={port.departId}/>
              <InputComponent labelDesc={'Descrição'} identify={'inputPortDesc'}>{port.desc}</InputComponent>
              <InputComponent labelDesc={'Desc. Patch Panel'} identify={'inputPatchPortDesc'}>{port.patchportdesc}</InputComponent>
              <button style={{backgroundColor:'transparent', border:'none'}}><BiSave onClick={handleUpdatePort} className='reactIconsBigger'/></button>
              <CgTrash onClick={handleDeletePort} className='reactIconsBigger'/>
            </form>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
const portData = await prismaExecute.read.port.unique(parseInt(context.params.id));
const departData = await prismaExecute.read.department.all()
  return {
    props: {port: portData, departments: departData},
  }
}
