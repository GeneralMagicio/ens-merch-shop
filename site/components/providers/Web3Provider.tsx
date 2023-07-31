import { ReactNode } from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, goerli],
	[publicProvider()],
);

const { connectors } = getDefaultWallets({
	appName: 'ENS Merch Shop',
	projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
	webSocketPublicClient,
});

interface Web3ProviderProps {
	children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
		</WagmiConfig>
	);
};
