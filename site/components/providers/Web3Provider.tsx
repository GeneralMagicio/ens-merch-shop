import { ReactNode } from 'react'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, goerli],
	[publicProvider()],
)

const { connectors } = getDefaultWallets({
	appName: 'My RainbowKit App',
	projectId: 'YOUR_PROJECT_ID',
	chains,
})

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
	webSocketPublicClient,
})

interface Web3ProviderProps {
	children: ReactNode
}

export const Web3Provider = ({ children }: Web3ProviderProps) => (
	<WagmiConfig config={wagmiConfig}>
		<RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
	</WagmiConfig>
)
