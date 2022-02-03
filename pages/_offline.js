import Container from '../components/container'
import Link from 'next/link'

export default function Home() {
    return (
        <Container>
            <h1>Você está offline!</h1>
            <h2>Esta página não pôde ser carregada</h2>
            <Link href={'/switchmap'}><a>Voltar</a></Link>
        </Container>
    )
}