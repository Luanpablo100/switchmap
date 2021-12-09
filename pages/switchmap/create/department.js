import Container from '../../../components/container'

import Link from 'next/link'

export default function Home() {
  return (
      <Container>
          <div>
            <Link href={'/switchmap/create/'}><a>Voltar</a></Link>
            <h1>Adicionar departamento</h1>
          </div>

      </Container>
  )
}
