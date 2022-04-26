import { ServerStyleSheet } from 'styled-components'
import Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta content='text/html; charset=utf-8' httpEquiv='Content-Type' />
          <meta content='Sterling May' name='author' />
          <meta content="Sterling May - Web Developer" property='og:site_name' />
          <meta content='website' property='og:type' />

          <link href='/favicon.ico' rel='shortcut icon' />
          <link href='/images/alt-favicons/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png' />
          <link href='/images/alt-favicons/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png' />
          <link href='/images/alt-favicons/favicon-194x194.png' rel='icon' sizes='194x194' type='image/png' />

          <link href='/site.webmanifest' rel='manifest' />
          <link href='/images/android-chrome-36x36.png' rel='icon' sizes='36x36' type='image/png' />
          <link href='/images/android-chrome-48x48.png' rel='icon' sizes='48x48' type='image/png' />
          <link href='/images/android-chrome-72x72.png' rel='icon' sizes='72x72' type='image/png' />
          <link href='/images/android-chrome-96x96.png' rel='icon' sizes='96x96' type='image/png' />
          <link href='/images/android-chrome-144x144.png' rel='icon' sizes='144x144' type='image/png' />
          <link href='/images/android-chrome-192x192.png' rel='icon' sizes='192x192' type='image/png' />
          <link href='/images/android-chrome-256x256.png' rel='icon' sizes='256x256' type='image/png' />
          <link href='/images/android-chrome-384x384.png' rel='icon' sizes='384x384' type='image/png' />
          <link href='/images/android-chrome-512x512.png' rel='icon' sizes='512x512' type='image/png' />

          <link color='#FFFFFF' href='./images/safari-pinned-tab.svg' rel='mask-icon' />
          <link href='/images/apple-touch-icons/apple-touch-icon-57x57.png' rel='apple-touch-icon' sizes='57x57' />
          <link href='/images/apple-touch-icons/apple-touch-icon-60x60.png' rel='apple-touch-icon' sizes='60x60' />
          <link href='/images/apple-touch-icons/apple-touch-icon-72x72.png' rel='apple-touch-icon' sizes='72x72' />
          <link href='/images/apple-touch-icons/apple-touch-icon-76x76.png' rel='apple-touch-icon' sizes='76x76' />
          <link href='/images/apple-touch-icons/apple-touch-icon-114x114.png' rel='apple-touch-icon' sizes='114x114' />
          <link href='/images/apple-touch-icons/apple-touch-icon-120x120.png' rel='apple-touch-icon' sizes='120x120' />
          <link href='/images/apple-touch-icons/apple-touch-icon-144x144.png' rel='apple-touch-icon' sizes='144x144' />
          <link href='/images/apple-touch-icons/apple-touch-icon-152x152.png' rel='apple-touch-icon' sizes='152x152' />
          <link href='/images/apple-touch-icons/apple-touch-icon-180x180.png' rel='apple-touch-icon' sizes='180x180' />

          <meta content='#FFFFFF' name='theme-color' />
          <meta content='#000000' name='msapplication-TileColor' />
          <meta content='browserconfig.xml' name='msapplication-config' />
          <meta content='/images/mstile-icons/mstile-70x70.png' name='msapplication-TileImage' sizes='70x70' />
          <meta content='/images/mstile-icons/mstile-150x150.png' name='msapplication-TileImage' sizes='144x144' />
          <meta content='/images/mstile-icons/mstile-144x144.png' name='msapplication-TileImage' sizes='150x150' />
          <meta content='/images/mstile-icons/mstile-310x150.png' name='msapplication-TileImage' sizes='310x150' />
          <meta content='/images/mstile-icons/mstile-310x310.png' name='msapplication-TileImage' sizes='310x310' />
          
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Jura&family=Orbitron&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
  
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}

export default MyDocument
