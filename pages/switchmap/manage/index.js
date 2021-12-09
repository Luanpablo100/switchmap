
import Container from '../../../components/container'

import Link from 'next/link'

export default function Home() {
  return (
      <Container>
        <div>
          <Link href={'/switchmap'}><a>Voltar</a></Link>
          <h1>Gerenciar</h1>
        </div>
        <Link href='/switchmap/manage/department'>Departamentos</Link>
        <Link href='/switchmap/manage/switch'>Switchs</Link>
      </Container>
  )
}
