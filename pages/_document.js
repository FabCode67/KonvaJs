import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Canvas Drawing App</title>
        <meta name="description" content="A simple drawing application" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}