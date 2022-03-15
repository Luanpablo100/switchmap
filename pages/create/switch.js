import Container from '../../components/container'
import Link from 'next/link'
import InputComponent from '../../components/input'
import ButtonComponent from '../../components/button'

import Select from '../../components/select'

import prismaExecute from '../../prisma/commands'

import createElement from '../../lib/fetch/create'

export default function Home({hacks, types}) {

  async function handleCreateSwitch(event) {

    event.preventDefault()

    const switchCode = document.getElementById('inputSwitchCode').value
    const hackCode = document.getElementById('selectHackCode').value
    const swTypeId = document.getElementById('selectSwType').value
    const location = document.getElementById('inputLocation').value
    const reference = document.getElementById('inputReference').value
    const mac = document.getElementById('inputMac').value
    const ip = document.getElementById('inputIp').value
    const postData = {switchCode: switchCode, hackCode: hackCode, swTypeId: swTypeId, location: location, reference: reference, mac:mac, ip:ip}

    createElement('switch', postData)
  }

  return (
      <Container>
        <div>
          <div>
            <Link href={'/create/'}><a className='returnLink'>Voltar</a></Link>
            <h1>Adicionar switch</h1>
          </div>
          <div>
            <form method='POST' onSubmit={handleCreateSwitch}>
              <InputComponent labelDesc={"Número do Switch"} identify={'inputSwitchCode'}></InputComponent>
              <Select data={hacks} identify={'selectHackCode'} labelDesc={'Hack'}/>
              <Select data={types} identify={'selectSwType'} labelDesc={'Estilo'}/>
              <InputComponent labelDesc={"Localização"} identify={'inputLocation'}></InputComponent>
              <InputComponent labelDesc={"Referência"} identify={'inputReference'}></InputComponent>
              <InputComponent labelDesc={"MAC"} identify={'inputMac'}></InputComponent>
              <InputComponent labelDesc={"IP"} identify={'inputIp'}></InputComponent>
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
  