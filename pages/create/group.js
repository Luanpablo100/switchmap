import Container from '../../components/container'
import Link from 'next/link'
import InputComponent from '../../components/input'
import ButtonComponent from '../../components/button'

import createElement from '../../lib/fetch/create'

export default function Home() {

  async function handleCreateGroup(event) {
    event.preventDefault()

    const groupName = document.getElementById('inputGroupName').value
    const groupColor = document.getElementById('inputGroupColor').value
    const postData = {groupName: groupName, color: groupColor}
   
    createElement('group', postData)
  }

  return (
      <Container>
        <div>
          <div>
            <Link href={'/create/'}><a className='returnLink'>Voltar</a></Link>
            <h1>Adicionar grupo</h1>
          </div>
          <div>
            <form method='POST' onSubmit={handleCreateGroup}>
              <InputComponent labelDesc={"Nome do grupo"} identify={'inputGroupName'}/>
              <InputComponent labelDesc={"Cor do grupo"} identify={'inputGroupColor'} type={'color'}>#FFFFFF</InputComponent>
              <ButtonComponent>Enviar</ButtonComponent>
            </form>
          </div>
        </div>
      </Container>
  )
}
