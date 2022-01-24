import createElement from '../../lib/fetch/create'
import prismaExecute from '../../prisma/commands'

import { useState, useEffect} from 'react'

import Homepage from '../../components/main'

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

  const setHackShown = () => {
    const inputSetHackShown = document.getElementById('inputSetHackShown').value
    localStorage.setItem('switchmapHackId', inputSetHackShown - 1)

    setLocalSelect(inputSetHackShown - 1)
  }

  const resetHackShown = () => {
    localStorage.setItem('switchmapHackId', 0)
    const localSelectId = localStorage.getItem('switchmapHackId')

    setLocalSelect(localSelectId)
  }

  async function fetchData() {
    const data = await fetch('/api/switchmap/hack')
    const jsonData = await data.json()

    setHackData(jsonData[localSelect])

    return jsonData[localSelect]
  }

  function changeDepartments() {
    const newDepartments = departments.filter((department) => {
      return (department.hackId === originData[localSelect].id) || (department.isRestricted === false)
    })
    setDepartmentData(newDepartments)
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

    fetchData()

    if(localSelect !== undefined) {
      changeDepartments()
    }

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

  return (
    <>
        <Homepage swTypes={swTypes} localSelect={localSelect} resetHackShown={resetHackShown} originData={originData} setHackShown={setHackShown} showSubtitles={showSubtitles} groups={groups} hackData={hackData} departments={departments} departmentData={departmentData} filterPorts={filterPorts} cancelFilter={cancelFilter} search={search} handleSavePDF={handleSavePDF}/>
    </>

    
  )
}

export async function getServerSideProps(context) {
  const originData = await prismaExecute.read.hack.allWithContent()
  const departments = await prismaExecute.read.department.all()
  const groupsData = await prismaExecute.read.group.all()
  const typesData = await prismaExecute.read.switchType.all()
  return {
    props: {originData, departments, groupsData, typesData},
  }
}
