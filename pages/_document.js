import Document, { Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href='/manifest.json'/>
                    <link rel="apple-touch-icon" href='/icon.svg'/>
                    <link rel="theme-color" content="#242627"/>
                    <meta name="theme-color" content="#242627"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument;