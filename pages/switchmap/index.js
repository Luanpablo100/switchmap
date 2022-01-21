import Container from '../../components/container'
import SwitchElement from '../../components/switchElement'
import Select from '../../components/select'
import ButtonComponent from '../../components/button'

import createElement from '../../lib/fetch/create'
import prismaExecute from '../../prisma/commands'

import { useState, useEffect } from 'react'

import Link from 'next/link'

import { HiFilter } from 'react-icons/hi'
import { ImCross, ImSearch } from 'react-icons/im'
import { BiReset } from 'react-icons/bi'
import { MdOutlineSubtitles } from 'react-icons/md'
import { VscFilePdf } from 'react-icons/vsc'

import styles from '../../styles/hack.module.css'
import exportPDF from '../../lib/functions/exportPDF'

export default function Home({originData, departments, groupsData, typesData}) {

  //Handle with witch hack is show
  const [hackData, setHackData] = useState()
  const [departmentData, setDepartmentData] = useState(departments)
  const [groups, setGroups] = useState(groupsData)
  const [swTypes, setSwTypes] = useState(typesData)
  const [localSelect, setLocalSelect] = useState()

  function handleSavePDF () {
    exportPDF(hackData, departments)
  }

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
      const data = await fetch('/api/switchmap/hack')
      const jsonData = await data.json()
      return setHackData(jsonData[localSelect])
  }

  //Set hack funtions

  const setHackShown = async() => {
    const inputSetHackShown = document.getElementById('inputSetHackShown').value
    localStorage.setItem('switchmapHackId', inputSetHackShown - 1)

    const data = await fetch('/api/switchmap/hack')
    const jsonData = await data.json()

    setHackData(jsonData[localSelect])
  }

  const resetHackShown = async() => {
    localStorage.setItem('switchmapHackId', 0)
    const data = await fetch('/api/switchmap/hack')
    const jsonData = await data.json()
    setHackData(jsonData[localSelect])
  }

  // UseEffect to reload the page on changes
  useEffect(() => {

    let isLocalHackIdNull = localStorage.getItem('switchmapHackId')

    if (isLocalHackIdNull === null) {

      localStorage.setItem('switchmapHackId', 0)
      setLocalSelect(localStorage.getItem('switchmapHackId'))

    } else {

      setLocalSelect(isLocalHackIdNull)
    }

    async function fetchData() {
      const data = await fetch('/api/switchmap/hack')
      const jsonData = await data.json()

      setHackData(jsonData[localSelect])
    }

    fetchData()
  }, [localSelect])

  let isShow = false
  function showSubtitles() {

    if(isShow === false) {

      document.getElementById('subtitles').style.width = "auto"
      document.getElementById('subtitles').style.height = "auto"
      isShow = true

    } else {
      document.getElementById('subtitles').style.width = "0px"
      document.getElementById('subtitles').style.height = "0px"
      isShow = false
    }
  }

  async function search(event) {

    event.preventDefault()

    const inputValue = event.target.value 
    const fetchData = {value: inputValue}
    
    const query = await createElement('search', fetchData)
    const jsonQuery = await query.json()

    setHackData(jsonQuery[localSelect])
  }


  //Function to show alert messages if database are empty, or did'nt have anything to show

  function isNull(hack) {
    if (hack === undefined) { //If database are empty
      return (
          <Container>
            <div className={styles.centerDiv}>
              <h2>Seu banco de dados está vazio!</h2>
              <h3>Primeiro, crie um hack!</h3>
              <Link href='/switchmap/create/hack'><a>Criar hack</a></Link>
            </div>
          </Container>
        )
    } else if (hack.Switchs[0] === undefined){ //If has no one switch
      return (
        <Container>
          <div className={styles.centerDiv}>
            <h2>Não há switchs para serem exibidos neste hack!</h2>
            <Link href='/switchmap/create/switch'><a>Criar switch</a></Link>

            <div  className={styles.controls}>
              <div className={styles.controlChild}>
                <Select identify={'inputSetHackShown'} data={originData}/>
                <div className={styles.controlGrandSon}>
                  <ButtonComponent onFunction={setHackShown}>Filtrar</ButtonComponent>
                  <BiReset onClick={resetHackShown} className='reactIcons'/>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )
    } else {
      return ( //Else, if are content on database, they will render the container with data
        <Container>
          <div className={styles.divSubtitles}>
            <MdOutlineSubtitles size={50} onClick={showSubtitles} style={{cursor:'pointer'}}/>
            <div id="subtitles" className={styles.subtitles}>
            {groups.map(group => (
              <div key={group.id} className={styles.subtitle}>
                <div style={{backgroundColor: group.color}} className={styles.subtitleColor}></div>
                <span>{group.codename}</span>
              </div>
            ))}
            </div>
          </div>
          <div>
          <div className={styles.searchDiv}>
            <form onKeyUp={search} onSubmit={search}>
              <input className={styles.serchInput}/>
            </form>
            <ImSearch size={20}/>
          </div>
            {
              hackData.Switchs.map(sw => (
                <SwitchElement sw={sw} key={sw.id} hackData={hackData} departments={departmentData} types={swTypes}/>
              ))
            }

            <div className={styles.controls}>
              <div className={styles.controlChild}>
                <Select data={departments} identify={'departmentSelectFilter'}/>
                <div className={styles.controlGrandSon}>
                  <HiFilter onClick={filterPorts} className='reactIcons iconFilter'/>
                  <ImCross onClick={cancelFilter} className='reactIcons iconFilter'/>
                </div>
              </div>
              <div className={styles.controlChild}>
                <Select identify={'inputSetHackShown'} data={originData}/>
                <div className={styles.controlGrandSon}>
                  <ButtonComponent onFunction={setHackShown}>Filtrar</ButtonComponent>
                  <BiReset onClick={resetHackShown} className='reactIcons'/>
                  <VscFilePdf size={30} onClick={handleSavePDF} style={{cursor:'pointer'}}/>
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
  const groupsData = await prismaExecute.read.group.all()
  const typesData = await prismaExecute.read.switchType.all()
  return {
    props: {originData, departments, groupsData, typesData},
  }
}
