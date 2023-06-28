import { FC } from 'react';
import * as Switch from '@radix-ui/react-switch';
import cn from 'clsx';
import { useCurrencyContext } from '@lib/hooks/useCurrencyContext';

const SwitchCurrency: FC = () => {
	const { priceCurrency, setPriceCurrency } = useCurrencyContext();

	const isEthPrice = priceCurrency === 'ETH';

	const handleToggle = () => {
		setPriceCurrency(isEthPrice ? 'USD' : 'ETH');
	};

	return (
		<form>
			<div className='flex items-center'>
				<Switch.Root
					checked={isEthPrice}
					onCheckedChange={handleToggle}
					className='relative w-28 h-10 rounded-lg bg-neutral-100'
				>
					<div className='flex justify-between px-4 font-bold text-sm text-zinc-400'>
						<span>ETH</span>
						<span>USD</span>
					</div>
					<Switch.Thumb
						className={cn(
							'flex items-center justify-center absolute left-1 top-1 bg-blue-primary rounded-md w-12 h-8 transition-transform duration-200 text-white font-bold text-sm',
							!isEthPrice && 'translate-x-14',
						)}
					>
						{isEthPrice ? 'ETH' : 'USD'}
					</Switch.Thumb>
				</Switch.Root>
			</div>
		</form>
	);
};

export default SwitchCurrency;
