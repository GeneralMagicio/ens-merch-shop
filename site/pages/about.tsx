import Link from 'next/link';
import commerce from '@lib/api/commerce';
import { Layout } from '@components/common';
import Newsletter from '@components/common/Newsletter';
import type { GetStaticPropsContext } from 'next';

export async function getStaticProps({
	preview,
	locale,
	locales,
}: GetStaticPropsContext) {
	const config = { locale, locales };
	const productsPromise = commerce.getAllProducts({
		variables: { first: 6 },
		config,
		preview,
	});
	const pagesPromise = commerce.getAllPages({ config, preview });
	const siteInfoPromise = commerce.getSiteInfo({ config, preview });
	const { products } = await productsPromise;
	const { pages } = await pagesPromise;
	const { categories, brands } = await siteInfoPromise;

	return {
		props: {
			products,
			categories,
			brands,
			pages,
		},
		revalidate: 60,
	};
}

export default function About() {
	return (
		<>
			<div className='max-w-3xl px-4 my-44 mx-auto'>
				<h2 className='text-5xl text-center font-bold'>About</h2>
				<p className='mt-14 text-2xl font-bold leading-8'>
					ENS Merch Shop sells official merchandise of{' '}
					<Link
						href={'https://ens.domains/'}
						className='text-blue-primary'
						target='_blank'
						rel='noopener noreferrer'
					>
						Ethereum Name Service (ENS)
					</Link>{' '}
					which is a distributed, open, and extensible naming system
					based on the Ethereum blockchain.
				</p>
				<p className='text-xl font-medium my-8 leading-7'>
					The shop was built and is maintained by{' '}
					<Link
						href={'https://www.generalmagic.io/'}
						className='text-blue-primary'
						target='_blank'
						rel='noopener noreferrer'
					>
						General Magic
					</Link>{' '}
					on behalf of ENS DAO. Funding for the shop was part of{' '}
					<Link
						href={
							'https://docs.ens.domains/v/governance/governance-proposals/term-2/ep16.2-executable-q3-and-q4-2022-ens-ecosystem-wg-budget'
						}
						className='text-blue-primary'
						target='_blank'
						rel='noopener noreferrer'
					>
						Q3 & Q4 2022 Ecosystem WG Budget.
					</Link>
				</p>
				<p className='text-xl font-medium leading-7'>
					<Link
						href={'https://www.generalmagic.io/'}
						className='text-blue-primary'
						target='_blank'
						rel='noopener noreferrer'
					>
						General Magic
					</Link>{' '}
					is a group of Web3 professionals with deep roots in the
					Ethereum ecosystem devoted to supporting commons-based
					organizations and public good projects. Our core business is
					providing solution services for impact DAOs. We sell
					high-quality merch for ENS domains owners.
				</p>
			</div>

			<Newsletter />
		</>
	);
}

About.Layout = Layout;
