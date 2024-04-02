import { useAccount } from 'wagmi';
import { useMemo } from 'react';
import ErrorMessage from '@components/ui/ErrorMessage';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@components/ui/Select';
import SignInButton from '@components/common/SignInButton/SignInButton';
import useENSNames from '@lib/hooks/useENSNames/useENSNames';
import useSiwe from '@lib/hooks/useSiwe';
import { LoadingDots } from '@components/ui';
import { ENSDomain } from '@lib/hooks/useENSNames/types';

interface SelectEnsNameProps {
	error: Error | null;
	loading: boolean;
	onSuccess: () => void;
	selectedEnsName: string | undefined;
	setSelectedEnsName: (ensName: string) => void;
	variant: any;
}

const SelectEnsName = ({
	error,
	loading,
	onSuccess,
	selectedEnsName,
	setSelectedEnsName,
	variant,
}: SelectEnsNameProps) => {
	const { address, isConnected } = useAccount();
	const { data: ensNamesData } = useENSNames({ address });

	const { signIn } = useSiwe({
		onSuccess,
	});

	// Filter only ens names with less than 19 characters including .eth
	const sortENSNames = useMemo(
		() =>
			ensNamesData?.domains
				.filter(ensName => ensName.name.length < 19)
				.sort(compareDomains),
		[ensNamesData],
	);

	return (
		<div className='w-full mt-2 mb-8'>
			{isConnected ? (
				<>
					<h2 className='mb-3 font-bold text-lg tracking-wide'>
						ENS Name
					</h2>
					<Select
						value={selectedEnsName}
						onValueChange={setSelectedEnsName}
					>
						<SelectTrigger>
							<SelectValue placeholder='Select your ENS name' />
						</SelectTrigger>
						<SelectContent className='bg-blue-surface overflow-y-scroll max-h-[300px] max-w-xl mx-4'>
							{(!sortENSNames || sortENSNames.length === 0) && (
								<SelectItem
									className='hover:bg-blue-primary hover:font-medium hover:text-white hover:text-opacity-100'
									value='rilxxlir.eth'
								>
									rilxxlir.eth
								</SelectItem>
							)}
							{sortENSNames?.map(({ id, name }) => (
								<SelectItem
									className='hover:bg-blue-primary hover:font-medium hover:text-white hover:text-opacity-100'
									key={id}
									value={name.toLowerCase()}
								>
									{name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<div>
						{error && (
							<ErrorMessage error={error} className='my-5' />
						)}
						<button
							aria-label='Add to Cart'
							type='button'
							className='w-full mt-8 flex items-center justify-center font-bold py-4 rounded-lg text-white bg-blue-primary disabled:opacity-70'
							onClick={() => {
								signIn();
							}}
							disabled={
								variant?.availableForSale === false ||
								loading ||
								!selectedEnsName
							}
						>
							{variant?.availableForSale === false
								? 'Not Available'
								: 'Add To Cart'}
							{loading && (
								<i className='pl-2 m-0 flex'>
									<LoadingDots />
								</i>
							)}
						</button>
					</div>
				</>
			) : (
				<SignInButton className='min-w-full' />
			)}
		</div>
	);
};

function compareDomains(a: ENSDomain, b: ENSDomain) {
	const aParts = a.name.split('.');
	const bParts = b.name.split('.');

	// Reverse the arrays to compare from TLD (top-level domain)
	const aPartsReversed = [...aParts].reverse();
	const bPartsReversed = [...bParts].reverse();
	const length = Math.max(aPartsReversed.length, bPartsReversed.length);

	for (let i = 0; i < length; i++) {
		if (aPartsReversed[i] !== bPartsReversed[i]) {
			if (aPartsReversed[i] === undefined) return -1; // If a is missing parts, b is a subdomain of a
			if (bPartsReversed[i] === undefined) return 1; // If b is missing parts, a is a subdomain of b
			return aPartsReversed[i].localeCompare(bPartsReversed[i]);
		}
	}

	// Prioritize less subdomain over more subdomain when domains are equal
	return aParts.length - bParts.length;
}

export default SelectEnsName;
