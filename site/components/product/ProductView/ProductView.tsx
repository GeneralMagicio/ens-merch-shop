import cn from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';
import s from './ProductView.module.css';
import { ProductSlider, ProductCard } from '@components/product';
import { Container, Text } from '@components/ui';
import { SEO } from '@components/common';
import ProductSidebar from '../ProductSidebar';
import Newsletter from '@components/common/Newsletter/Newsletter';
import type { Product } from '@commerce/types/product';
interface ProductViewProps {
	product: Product;
	relatedProducts: Product[];
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
	const [selectedColor, setSelectedColor] = useState<string>();
	return (
		<>
			<Container className='max-w-none w-full mt-28 px-6' clean>
				<div className={cn(s.root, 'fit')}>
					<div className={cn(s.main, 'fit')}>
						<ProductSlider
							key={product.id}
							selectedColor={selectedColor}
							images={product.images}
						>
							{product.images.map((image, i) => (
								<div
									key={image.url}
									className={s.imageContainer}
								>
									<Image
										className={s.img}
										src={image.url!}
										alt={image.alt || 'Product Image'}
										width={600}
										height={600}
										priority={i === 0}
										quality='85'
									/>
								</div>
							))}
						</ProductSlider>
					</div>
					<ProductSidebar
						setSelectedColor={setSelectedColor}
						key={product.id}
						product={product}
						className={s.sidebar}
					/>
				</div>
				<section className='py-12 px-6 mt-20 mb-10'>
					<Text variant='sectionHeading'>Related Products</Text>
					<div className={s.relatedProductsGrid}>
						{relatedProducts.map(p => (
							<div key={p.path} className='bg-accent-0'>
								<ProductCard
									product={p}
									key={p.path}
									variant='simple'
									className='animated fadeIn'
									imgProps={{
										alt: p.name,
										className: 'w-full h-full object-cover',
									}}
								/>
							</div>
						))}
					</div>
				</section>
			</Container>
			<Newsletter />
			<SEO
				title={product?.seo?.title || product.name}
				description={product?.seo?.description || product.description}
				openGraph={{
					type: 'website',
					title: product?.seo?.title || product.name,
					description:
						product?.seo?.description || product.description,
					images: [
						{
							url: product.images[0]?.url!,
							width: '800',
							height: '600',
							alt: product.name,
						},
					],
				}}
			/>
		</>
	);
};

export default ProductView;
