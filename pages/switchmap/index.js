import Container from '../../components/container'
import SwitchElement from '../../components/switchElement'
import DepartmentSelect from '../../components/departmentSelect'

import prismaExecute from '../../prisma/commands'

import { useEffect } from 'react'

import Router from 'next/router'

import {HiFilter} from 'react-icons/hi'
import {ImCross} from 'react-icons/im'
import {BiReset} from 'react-icons/bi'

import styles from '../../styles/hack.module.css'

import { useState } from 'react'
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

  const cancelFilter = async() => {   
      const data = await fetch('/api/switchmap/read/hack')
      const jsonData = await data.json()
      return setHackData(jsonData[localSelect])
  }

  const setHackShown = async() => {
    const inputSetHackShown = document.getElementById('inputSetHackShown').value
    localStorage.setItem('switchmapHackId', inputSetHackShown - 1)
    const setLocalSelect = localStorage.getItem('switchmapHackId')
    const data = await fetch('/api/switchmap/read/hack')
    const jsonData = await data.json()
    setHackData(jsonData[setLocalSelect])
  }

  const resetHackShown = () => {
    localStorage.setItem('switchmapHackId', 0)
  }

  useEffect(async () => {
    const data = await fetch('/api/switchmap/read/hack')
    const jsonData = await data.json()
    setHackData(jsonData[localSelect])
  }, [])

  function isNull(hack) {
    if (hack === undefined) {
      return (
          <Container>
            <h2>Seu banco de dados está vazio!</h2>
          </Container>
        )
    } else if (hack.Switchs[0] === undefined){
      return (
        <Container>
          <h2>Não há switchs para serem exibidos!</h2>
        </Container>
      )
    } else {
      return (
        <Container>
          {
            hackData.Switchs.map(sw => (
              <SwitchElement sw={sw} key={sw.id} hackData={hackData}/>
            ))
          }

          <div  className={styles.controls}>
            <div className={styles.controlChild}>
              <DepartmentSelect departments={departments} identify={'departmentSelectFilter'}/>
              <div>
                <HiFilter onClick={filterPorts} className='reactIcons'/>
                <ImCross onClick={cancelFilter} className='reactIcons'/>
              </div>
            </div>
            <div className={styles.controlChild}>
              <Select identify={'inputSetHackShown'} datas={originData}/>
              <div>
                <button onClick={setHackShown}>Pesquisar</button>
                <BiReset onClick={resetHackShown} className='reactIcons'/>
              </div>
            </div>
          </div>
        </Container>
      )
    }
  } 
  return (
    <>
     {isNull(hackData)}
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
