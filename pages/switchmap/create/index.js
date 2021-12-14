import Container from '../../../components/container'
import Link from 'next/link'

export default function Home() {
  return (
      <Container>
        <div>
          <Link href={'/switchmap'}><a>Voltar</a></Link>
          <h1>Criar elementos</h1>
        </div>
          <Link href='/switchmap/create/hack'><a>Hack</a></Link>
          <Link href='/switchmap/create/department'><a>Departamento</a></Link>
          <Link href='/switchmap/create/switch'><a>Switch</a></Link>
          <Link href='/switchmap/create/port'><a>Porta</a></Link>
      </Container>
  )
}
