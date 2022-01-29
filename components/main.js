import Select from './select'
import ButtonComponent from './button'

import dynamic from 'next/dynamic'

const exportPDF = dynamic(() => import('../lib/functions/exportPDF'))
const SwitchContainer = dynamic(() => import('./switchContainer'))

import Link from 'next/link'

import { useState, useEffect } from 'react'

import { HiFilter } from 'react-icons/hi'
import { ImCross, ImSearch } from 'react-icons/im'
import { BiReset } from 'react-icons/bi'
import { MdOutlineSubtitles } from 'react-icons/md'
import { VscFilePdf } from 'react-icons/vsc'

import styles from '../styles/hack.module.css'

export default function Homepage({allRacks, departmentData}) {

  const [isLoaded, setIsLoaded] = useState(false)
  const [rack, setRack] = useState()
  const [groups, setGroups] = useState()
  const [swTypes, setSwTypes] = useState()
  const [localSelect, setLocalSelect] = useState()
  const [departments, setDepartments] = useState()

  async function search(event) {

    event.preventDefault()

    const inputValue = event.target.value 
    const fetchData = {value: inputValue}

    
    const query = await createElement('search', fetchData)
    const jsonQuery = await query.json()

    setRack(jsonQuery[localSelect])
  }

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

  function handleSavePDF () {
    exportPDF(rack, departments)
  }
  
    //Handle with filter switch ports
  
  const filterPorts = () => {
    let filterId = document.getElementById('departmentSelectFilter').value
    let newData = {...rack}
    newData.Switchs.map(sw => {
        const newPorts = sw.Ports.filter(port => port.departId === parseInt(filterId))
        sw.Ports = newPorts
        return sw
      }
    )
    setRack(newData)
  }
  
  const cancelFilter = async() => {   
    const data = await fetch('/api/switchmap/hack')
    const jsonData = await data.json()
    return setRack(jsonData[localSelect])
  }
  
    //Set hack funtions
  
  const setHackShown = () => {
    const inputSetHackShown = document.getElementById('inputSetHackShown').value
    localStorage.setItem('switchmapHackId', inputSetHackShown - 1)

    setRack(allRacks[inputSetHackShown - 1])
  }

  const resetHackShown = () => {
    localStorage.setItem('switchmapHackId', 0)
    const localSelectId = localStorage.getItem('switchmapHackId')

    setRack(allRacks[localSelectId])
  }

  async function getGroups() {
      const groups = await (await fetch('/api/switchmap/group')).json()
      setGroups(groups)
  }

  async function getTypes() {
      const types = await (await fetch('/api/switchmap/swtype')).json()
      setSwTypes(types)
  }

  useEffect(() => {

    function changeDepartments() {
    
      const newDepartments = departmentData.filter((department) => {
        return (department.hackId === allRacks[localSelectId].id) || (department.isRestricted === false)
      })

      setDepartments(newDepartments)
    }

    setIsLoaded(true)
    let localSelectId
    if(localStorage.getItem('switchmapHackId') === undefined) {
      localSelectId = 0
      localStorage.setItem('switchmapHackId', 0)
    } else {
      localSelectId = localStorage.getItem('switchmapHackId')
    }
    setLocalSelect(localSelectId)
    setRack(allRacks[localSelectId])
    getGroups()
    getTypes()
    changeDepartments()

  }, [allRacks])

  return ( //Else, if are content on database, they will render the container with data
    isLoaded === true ? (
      <>
      {rack === undefined ? 
      
        <div className={styles.centerDiv}>
          <h2>Seu banco de dados está vazio!</h2>
          <h3>Primeiro, crie um hack!</h3>
          <Link href='/switchmap/create/hack'><a>Criar hack</a></Link>
          <BiReset onClick={resetHackShown} className='reactIcons'/>
        </div>

      : rack.Switchs[0] === undefined ? 
      
        <div className={styles.centerDiv}>
          <h2>Não há switchs para serem exibidos neste hack!</h2>
          <Link href='/switchmap/create/switch'><a>Criar switch</a></Link>

          <div  className={styles.controls}>
            <div className={styles.controlChild}>
            <Select identify={'inputSetHackShown'} data={allRacks} firstValue={rack.id}/>
            <div className={styles.controlGrandSon}>
                <ButtonComponent onFunction={setHackShown}>Filtrar</ButtonComponent>
                <BiReset onClick={resetHackShown} className='reactIcons'/>
            </div>
            </div>
          </div>
        </div>
      : 
        <>
          <div className={styles.divSubtitles}>
            <MdOutlineSubtitles size={50} onClick={showSubtitles} style={{cursor:'pointer'}}/>
            <div id="subtitles" className={styles.subtitles}>

            {groups === undefined ? <h1>Carregando...</h1> : groups.map(group => (
                <div key={group.id} className={styles.subtitle}>
                <div style={{backgroundColor: group.color}} className={styles.subtitleColor}></div>
                <span>{group.codename}</span>
                </div>
            ))}

            </div>
            </div>
            <div style={{width: '100%'}}>
              <div className={styles.searchDiv}>
              <form onKeyUp={search} onSubmit={search}>
                  <input className={styles.serchInput}/>
              </form>
              <ImSearch size={20}/>
              </div>
              {swTypes === undefined ? '' : <SwitchContainer rack={rack} swTypes={swTypes} departments={departments}/>}
              
              <div className={styles.controls}>
                <div className={styles.controlChild}>
                  <Select data={departments} identify={'departmentSelectFilter'}/>
                  <div className={styles.controlGrandSon}>
                      <HiFilter onClick={filterPorts} className='reactIcons iconFilter'/>
                      <ImCross onClick={cancelFilter} className='reactIcons iconFilter'/>
                  </div>
                </div>
                <div className={styles.controlChild}>
                  <Select identify={'inputSetHackShown'} data={allRacks} firstValue={rack.id}/>
                  <div className={styles.controlGrandSon}>
                    <ButtonComponent onFunction={setHackShown}>Filtrar</ButtonComponent>
                    <BiReset onClick={resetHackShown} className='reactIcons'/>
                    <VscFilePdf size={30} onClick={handleSavePDF} style={{cursor:'pointer'}}/>
                  </div>
                </div>
              </div>
          </div>
        </>
      }
          
      </>
    ) : <h1>Carregando...</h1>
  )
}