import { Html, Head, Main, NextScript } from 'next/document'
import HTMLHead from '../components/html-head'

export default function Document() {
  return (
    <Html>
      <Head>
        <HTMLHead />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
