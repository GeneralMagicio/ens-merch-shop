import useWishlist from '@framework/wishlist/use-wishlist';
import commerce from '@lib/api/commerce';
import { Heart } from '@components/icons';
import { Layout, SEO } from '@components/common';
import { Text, Container, Skeleton } from '@components/ui';
import { WishlistCard } from '@components/wishlist';
import rangeMap from '@lib/range-map';
import type { GetStaticPropsContext } from 'next';

export async function getStaticProps({
	preview,
	locale,
	locales,
}: GetStaticPropsContext) {
	// Disabling page if Feature is not available
	if (!process.env.COMMERCE_WISHLIST_ENABLED) {
		return {
			notFound: true,
		};
	}

	const config = { locale, locales };
	const pagesPromise = commerce.getAllPages({ config, preview });
	const siteInfoPromise = commerce.getSiteInfo({ config, preview });
	const { pages } = await pagesPromise;
	const { categories } = await siteInfoPromise;

	return {
		props: {
			pages,
			categories,
		},
	};
}

export default function Wishlist() {
	// @ts-ignore Shopify - Fix this types
	const { data, isLoading, isEmpty } = useWishlist({
		includeProducts: true,
	});

	return (
		<>
			<Container className='pt-4'>
				<div className='mb-20'>
					<Text variant='pageHeading'>My Wishlist</Text>
					<div className='group flex flex-col'>
						{isLoading ? (
							<div className='grid grid-cols-1 gap-6'>
								{rangeMap(4, i => (
									<Skeleton key={i}>
										<div className='w-full h-[279px]' />
									</Skeleton>
								))}
							</div>
						) : isEmpty ? (
							<div className='flex-1 px-12 py-24 flex flex-col justify-center items-center '>
								<span className='border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary'>
									<Heart className='absolute' />
								</span>
								<h2 className='pt-6 text-2xl font-bold tracking-wide text-center'>
									Your wishlist is empty
								</h2>
							</div>
						) : (
							<div className='grid grid-cols-1 gap-6 '>
								{data &&
									// @ts-ignore - Wishlist Item Type
									data.items?.map(item => (
										<WishlistCard
											key={item.id}
											item={item}
										/>
									))}
							</div>
						)}
					</div>
				</div>
			</Container>
			<SEO title='Wishlist' />
		</>
	);
}

Wishlist.Layout = Layout;
