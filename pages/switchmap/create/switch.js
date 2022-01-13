import Container from '../../../components/container'
import Link from 'next/link'
import InputComponent from '../../../components/input'
import ButtonComponent from '../../../components/button'

import prismaExecute from '../../../prisma/commands'

import Router from 'next/router'

import SelectHack from '../../../components/selectHack'
import SelectGroup from '../../../components/selectGroup'

export default function Home({hacks, types}) {
  async function submitSwitch(event) {
    event.preventDefault()
    const switchCode = document.getElementById('inputSwitchCode').value
    const hackCode = document.getElementById('selectHackCode').value
    const swTypeId = document.getElementById('selectSwType').value
    const postData = {switchCode: switchCode, hackCode: hackCode, swTypeId: swTypeId}
    fetch('/api/switchmap/add/switch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    }).then(Router.push('/switchmap'))
  }

  return (
      <Container>
        <div>
          <div>
            <Link href={'/switchmap/create/'}><a>Voltar</a></Link>
            <h1>Adicionar switch</h1>
          </div>
          <div>
            <form method='POST' onSubmit={submitSwitch}>
              <InputComponent labelDesc={"Número do Switch"} identify={'inputSwitchCode'}></InputComponent>
              <SelectHack datas={hacks} identify={'selectHackCode'} labelDesc={'Hack'}/>
              <SelectGroup datas={types} identify={'selectSwType'} labelDesc={'Estilo'}/>
              <ButtonComponent>Enviar</ButtonComponent>
            </form>
          </div>
        </div>
      </Container>
  )
}

export async function getServerSideProps(context) {
  const hacksData = await prismaExecute.read.hack.all()
  const typesData = await prismaExecute.read.switchType.all()
    return {
      props: {hacks: hacksData, types: typesData},
    }
  }
  