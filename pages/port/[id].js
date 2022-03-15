import Container from '../../components/container'

import InputComponent from '../../components/input';

import Link from 'next/link';

import { CgTrash } from "react-icons/cg"
import { BiSave } from 'react-icons/bi'

import styles from '../../styles/form.module.css'

import prismaExecute from '../../prisma/commands';
import Select from '../../components/select';

import {useState, useEffect} from 'react'

import updateElement from '../../lib/fetch/update';
import deleteElement from '../../lib/fetch/delete';

export default function Home({port, departmentData, switchsData, rackData}) {
  const [switchs, setSwitchs] = useState(switchsData)
  const [departments, setDepartments] = useState(departmentData)
  const [localSelect, setLocalSelect] = useState()


  useEffect(() => {

    let isLocalHackIdNull = localStorage.getItem('switchmapHackId')

    if (isLocalHackIdNull === null) {

      localStorage.setItem('switchmapHackId', 0)
      setLocalSelect(localStorage.getItem('switchmapHackId'))

    } else {

      setLocalSelect(isLocalHackIdNull)
    }

    function changeDepartments() {
      const newDepartments = departments.filter((department) => {
        return (department.hackId === rackData[localSelect].id) || (department.isRestricted === false)
      })
      setDepartments(newDepartments)
    }

    function changeSwitchs() {
      const newSwitchs = switchs.filter((sw) => {
        return (sw.rackCode === rackData[localSelect].id)
      })
      setSwitchs(newSwitchs)
    }

    if(localSelect === undefined) {
      return
    } else {
      changeDepartments()
      changeSwitchs()
    }

  }, [])

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
            <Link href={'/'}><a className='returnLink'>Voltar</a></Link>
            <form method='POST' onSubmit={handleUpdatePort}>
              <InputComponent labelDesc={'Porta'} identify={'inputPortCode'}>{port.codename}</InputComponent>
              <Select data={switchs} identify={'selectSwitch'} labelDesc="Switch" firstValue={port.switchCode}/>
              <Select data={departments} identify={'selectDepartment'} labelDesc="Departamento" firstValue={port.departId}/>
              <InputComponent labelDesc={'Descrição'} identify={'inputPortDesc'}>{port.desc}</InputComponent>
              <InputComponent labelDesc={'Desc. Patch Panel'} identify={'inputPatchPortDesc'}>{port.patchportdesc}</InputComponent>
              <div className={styles.itemControls}>
                <button style={{backgroundColor:'transparent', border:'none'}}><BiSave onClick={handleUpdatePort} className='reactIconsBigger'/></button>
                <CgTrash onClick={handleDeletePort} className='reactIconsBigger'/>
              </div>
            </form>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
const portData = await prismaExecute.read.port.unique(parseInt(context.params.id));
const departmentData = await prismaExecute.read.department.all()
const rackData = await prismaExecute.read.hack.all()
const switchsData = await prismaExecute.read.switch.all()
  return {
    props: {port: portData, departmentData, switchsData, rackData},
  }
}
