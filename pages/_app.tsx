import '../styles/globals.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/400.css'
import Head from 'next/head'

import { ReactElement, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import SiteLayout from '../layouts/Default'
import { NextPage } from 'next'

Sentry.init({
  dsn: 'https://ff771404287542638b24e14b8de8edff@o573965.ingest.sentry.io/5724646',
  environment: process.env.NODE_ENV,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

const title = 'MyCovidStory.ca | The Stories of COVID-19 in Ontario'
const description =
  "Ontario is in a humanitarian crisis. If our leaders won't listen to the numbers, they must face our stories."
const previewImage = 'https://www.mycovidstory.ca/img/landingpage-v2.jpg'

type GetLayout = (page: ReactNode) => ReactElement
type PageWithLayout = NextPage & {
  getLayout: GetLayout
}

interface MyAppProps {
  Component: PageWithLayout
  pageProps: unknown
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter()

  useEffect(() => {
    Fathom.load('XNKNPYHV', {
      includedDomains: ['www.mycovidstory.ca'],
    })

    function onRouteChangeComplete(): void {
      Fathom.trackPageview()
    }

    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  const getLayout = Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>)

  return getLayout(
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={previewImage} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={previewImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
