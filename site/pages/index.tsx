import commerce from '@lib/api/commerce';
import { Layout } from '@components/common';
import { ProductCard } from '@components/product';
import { Hero } from '@components/ui';
import Newsletter from '@components/common/Newsletter';
import ProductSection from '@components/product/ProductSection';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

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
	const selectedProducts = products
		.sort(() => 0.5 - Math.random())
		.slice(0, 4);

	const featuredProductsPromise = selectedProducts
		.slice(0, 2)
		.map(({ slug }) =>
			commerce.getProduct({
				variables: { slug: slug || '' },
				config,
				preview,
			}),
		);

	const featuredProducts = (await Promise.all(featuredProductsPromise)).map(
		({ product }) => product,
	);

	return {
		props: {
			products: selectedProducts,
			featuredProducts,
			categories,
			brands,
			pages,
		},
		revalidate: 60,
	};
}

export default function Home({
	products,
	featuredProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Hero
				headline='Get your official ENS Merch!'
				description='Show your love for decentralized naming'
			/>
			<div>
				<ProductSection product={featuredProducts[0]} />
			</div>
			<section className='w-full py-24 bg-blue-surface'>
				<div className='text-center px-4'>
					<h3 className='font-bold text-5xl'>
						Discover the latest high quality ENS merch
					</h3>
					<h5 className='mt-3 font-medium text-xl'>
						Look good and feel good knowing you support
						decentralized naming
					</h5>
				</div>
				<div className='grid grid-cols-1 2xl:grid-cols-2 px-4 lg:px-10 mt-24 justify-items-center gap-y-14'>
					{products.slice(2, 4).map(product => (
						<ProductCard
							key={product.id}
							product={product}
							variant='floating'
							imgProps={{
								alt: product.name,
								width: 400,
								height: 400,
							}}
						/>
					))}
				</div>
			</section>
			<ProductSection product={featuredProducts[1]} />
			<Newsletter />
		</>
	);
}

Home.Layout = Layout;
