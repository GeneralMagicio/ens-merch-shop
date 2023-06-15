import '@rainbow-me/rainbowkit/styles.css'
import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, ReactNode, useEffect } from 'react'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { Web3Provider } from '@components/providers/Web3Provider'
import { CurrencyProvider } from '@components/ui/CurrencyContext'
import type { AppProps } from 'next/app'

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
							<noscript>
								<iframe
									className='hidden invisible'
									src='https://www.googletagmanager.com/ns.html?id=GTM-KJL3XCM'
									height='0'
									width='0'
								></iframe>
							</noscript>
							<Component {...pageProps} />
						</Layout>
					</CurrencyProvider>
				</ManagedUIContext>
			</Web3Provider>
		</>
	)
}
