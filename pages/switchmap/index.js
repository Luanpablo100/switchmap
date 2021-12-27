import Container from '../../components/container'
import SwitchElement from '../../components/switchElement'
import DepartmentSelect from '../../components/departmentSelect'
import Select from '../../components/select'
import ButtonComponent from '../../components/button'

import prismaExecute from '../../prisma/commands'

import { useState } from 'react'
import { useEffect } from 'react'

import {HiFilter} from 'react-icons/hi'
import {ImCross} from 'react-icons/im'
import {BiReset} from 'react-icons/bi'
import { MdOutlineSubtitles } from 'react-icons/md'

import styles from '../../styles/hack.module.css'

export default function Home({originData, departments}) {

  //Handle with witch hack is show
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
  const [departmentData, setDepartmentData] = useState(departments)

  //Handle with filter switch ports

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

  //Set hack funtions

  const setHackShown = async() => {
    const inputSetHackShown = document.getElementById('inputSetHackShown').value
    localStorage.setItem('switchmapHackId', inputSetHackShown - 1)
    const setLocalSelect = localStorage.getItem('switchmapHackId')
    const data = await fetch('/api/switchmap/read/hack')
    const jsonData = await data.json()
    setHackData(jsonData[setLocalSelect])
  }

  const resetHackShown = async() => {
    localStorage.setItem('switchmapHackId', 0)
    const setLocalSelect = localStorage.getItem('switchmapHackId')
    const data = await fetch('/api/switchmap/read/hack')
    const jsonData = await data.json()
    setHackData(jsonData[setLocalSelect])
  }

  // UseEffect to reload the page on changes

  useEffect(async () => {
    const data = await fetch('/api/switchmap/read/hack')
    const jsonData = await data.json()
    setHackData(jsonData[localSelect])
  }, [])

  function showSubtitles() {
    if(document.getElementById('subtitles').style.width !== '0px') {
      document.getElementById('subtitles').style.width = "0px"
      document.getElementById('subtitles').style.height = "0px"
    } else {
      document.getElementById('subtitles').style.width = "auto"
      document.getElementById('subtitles').style.height = "auto"
    }
  }


  //Function to show alert messages if database are empty, or did'nt have anything to show

  function isNull(hack) {
    if (hack === undefined) { //If database are empty
      return (
          <Container>
            <h2>Seu banco de dados está vazio!</h2>
          </Container>
        )
    } else if (hack.Switchs[0] === undefined){ //If has no one switch
      return (
        <Container>
          <h2>Não há switchs para serem exibidos!</h2>
          <div  className={styles.controls}>
            <div className={styles.controlChild}>
              <Select identify={'inputSetHackShown'} datas={originData}/>
              <div className={styles.controlGrandSon}>
                <ButtonComponent onFunction={setHackShown}>Filtrar</ButtonComponent>
                <BiReset onClick={resetHackShown} className='reactIcons'/>
              </div>
            </div>
          </div>
        </Container>
      )
    } else {
      return ( //Else, if are content on database, they will render the container with data
        <Container>
          <div style={{position: 'absolute', left: '0', marginLeft: '10px'}}>
            <MdOutlineSubtitles size={50} onClick={showSubtitles}/>
            <div id="subtitles" style={{overflow: 'hidden'}}>
            {departments.map(department => (
              <div style={{display: 'flex', alignItems: 'center', textAlign: 'center', marginBottom: '5px'}}><div style={{backgroundColor: department.color, width: '20px', height: '20px', borderRadius: '10px', marginRight: '5px', border: '1px solid #FFF'}}></div><span>{department.departName}</span></div>
            ))}
            </div>
          </div>
          <div>
            {
              hackData.Switchs.map(sw => (
                <SwitchElement sw={sw} key={sw.id} hackData={hackData} departments={departmentData}/>
              ))
            }

            <div  className={styles.controls}>
              <div className={styles.controlChild}>
                <DepartmentSelect departments={departments} identify={'departmentSelectFilter'}/>
                <div className={styles.controlGrandSon}>
                  <HiFilter onClick={filterPorts} className='reactIcons iconFilter'/>
                  <ImCross onClick={cancelFilter} className='reactIcons iconFilter'/>
                </div>
              </div>
              <div className={styles.controlChild}>
                <Select identify={'inputSetHackShown'} datas={originData}/>
                <div className={styles.controlGrandSon}>
                  <ButtonComponent onFunction={setHackShown}>Filtrar</ButtonComponent>
                  <BiReset onClick={resetHackShown} className='reactIcons'/>
                </div>
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
