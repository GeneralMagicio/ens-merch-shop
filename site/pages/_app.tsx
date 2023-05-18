import '@rainbow-me/rainbowkit/styles.css'
import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { Web3Provider } from '@components/providers/Web3Provider'
import { CurrencyProvider } from '@components/ui/CurrencyContext'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <Web3Provider>
        <ManagedUIContext>
          <CurrencyProvider>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </CurrencyProvider>
        </ManagedUIContext>
      </Web3Provider>
    </>
  )
}
