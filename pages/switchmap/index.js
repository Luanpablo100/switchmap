import prismaExecute from '../../prisma/commands'

import Container from '../../components/container'

import dynamic from 'next/dynamic'

const Homepage = dynamic(() => import('../../components/main'))

import { useEffect, useState } from 'react'

export default function Home({originData, departments}) {

  const [allRacks, setAllRacks] = useState(originData)
  const [allDepartments, setAllDepartments] = useState(departments)

  useEffect(() => {

    async function getAllRackData() {
      const data = await (await fetch('/api/switchmap/hack')).json()
      setAllRacks(data)
    }

    async function getDepartments() {
      const data = await (await fetch('/api/switchmap/department')).json()
      setAllDepartments(data)
    }

    getAllRackData()
    getDepartments()
  }, [])

  // UseEffect to reload the page on changes
  return (
      <Container>
        <Homepage allRacks={allRacks} departmentData={allDepartments}/>
      </Container>
  )
}

export async function getServerSideProps(context) {
  const originData = await prismaExecute.read.hack.allWithContent()
  const departments = await prismaExecute.read.department.all()
  return {
    props: {originData, departments},
  }
}
