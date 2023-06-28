import { createContext, useState } from 'react';

interface EthPriceProviderProps {
	children: React.ReactNode;
}

export const CurrencyContext = createContext<{
	priceCurrency: 'ETH' | 'USD';
	setPriceCurrency: (currency: 'ETH' | 'USD') => void;
}>({
	priceCurrency: 'USD',
	setPriceCurrency: () => null,
});

export const CurrencyProvider = ({ children }: EthPriceProviderProps) => {
	const [priceCurrency, setPriceCurrency] = useState<'ETH' | 'USD'>('USD');
	return (
		<CurrencyContext.Provider
			value={{
				priceCurrency,
				setPriceCurrency,
			}}
		>
			{children}
		</CurrencyContext.Provider>
	);
};
