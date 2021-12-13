import Container from '../../components/container'
import SwitchElement from '../../components/switchElement'
import DepartmentSelect from '../../components/departmentSelect'

import prismaExecute from '../../prisma/commands'

import Router from 'next/router'

import {HiFilter} from 'react-icons/hi'
import {ImCross} from 'react-icons/im'
import {BiReset} from 'react-icons/bi'

import styles from '../../styles/hack.module.css'

import { useState } from 'react'
import InputComponent from '../../components/input'
import Select from '../../components/select'

export default function Home({originData, departments}) {

  let localSelect = 0
  if (typeof window !== "undefined") {

    let isLocalHackIdNull = localStorage.getItem('switchmapHackId')

    if (isLocalHackIdNull === null) {
      localStorage.setItem('switchmapHackId', 0)
      localSelect = localStorage.getItem('switchmapHackId')
    } else {
      localSelect = isLocalHackIdNull
    }
  }

  let selectedHack = originData[localSelect]

  const [hackData, setHackData] = useState(selectedHack)

  const filterPorts = () => {
    let filterId = document.getElementById('departmentSelectFilter').value
    let newData = {...hackData}
    newData.Switchs.map(sw => {
        const newPorts = sw.Ports.filter(port => port.departId === parseInt(filterId))
        sw.Ports = newPorts
        return sw
      }
    )
    setHackData(newData)
  }

  const cancelFilter = () => {
    return Router.reload()
  }

  const setHackShown = () => {
    const inputSetHackShown = document.getElementById('inputSetHackShown').value
    localStorage.setItem('switchmapHackId', inputSetHackShown - 1)
    return Router.reload()
  }

  const resetHackShown = () => {
    localStorage.setItem('switchmapHackId', 0)
  }

  return (
    <>
       <Container>
        {hackData.Switchs.map(sw => (
          <SwitchElement sw={sw} key={sw.id}/>
          )
          )}
        <div  className={styles.controls}>
          <div className={styles.controlChild}>
            <DepartmentSelect departments={departments} identify={'departmentSelectFilter'}/>
            <div>
              <HiFilter onClick={filterPorts} className='reactIcons'/>
              <ImCross onClick={cancelFilter} className='reactIcons'/>
            </div>
          </div>
          <div className={styles.controlChild}>
            {/* <InputComponent identify={'inputSetHackShown'} labelDesc={'Hack a exibir'}/> */}
            <Select identify={'inputSetHackShown'} datas={originData}/>
            <div>
              <button onClick={setHackShown}>Pesquisar</button>
              <BiReset onClick={resetHackShown} className='reactIcons'/>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const originData = await prismaExecute.read.hack.all()
  const departments = await prismaExecute.read.department.all()
  return {
    props: {originData, departments},
  }
}
