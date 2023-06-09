import { FC } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import usePrice from '@framework/product/use-price';
import cn from 'clsx';
import WishlistButton from '@components/wishlist/WishlistButton';
import ProductTag from '../ProductTag';
import { EnsLogo } from '@components/icons';
import ProductTypePill from '@components/ui/ProductTypePill';
import { useCurrencyContext } from '@lib/hooks/useCurrencyContext';
import type { Product } from '@commerce/types/product';

interface Props {
	className?: string;
	product: Product;
	noNameTag?: boolean;
	imgProps?: Omit<
		ImageProps,
		'src' | 'layout' | 'placeholder' | 'blurDataURL'
	>;
	variant?: 'default' | 'slim' | 'simple' | 'floating';
}

const placeholderImg = '/product-img-placeholder.svg';

const ProductCard: FC<Props> = ({
	className,
	product,
	imgProps,
	noNameTag = false,
	variant = 'default',
}) => {
	const { priceCurrency } = useCurrencyContext();

	const { price } = usePrice({
		selectedCurrency: priceCurrency,
		amount: product.price.value,
		baseAmount: product.price.retailPrice,
		currencyCode: product.price.currencyCode!,
	});

	if (variant === 'floating')
		return (
			<div
				className={cn(
					'relative bg-blue-primary w-[500px] lg:w-[560px] max-w-full h-[400px] rounded-3xl p-9',
					className,
				)}
			>
				<EnsLogo />
				<div className='mt-12 text-white md:max-w-[270px]'>
					<h3 className='font-black text-4xl leading-[48px] line-clamp-2'>
						{product.name}
					</h3>
					<p className='mt-4 font-medium text-lg line-clamp-3'>
						{product.description}
					</p>
				</div>
				<Link
					className='inline-block bg-white mt-4 py-3 px-8 rounded-lg text-blue-primary font-bold'
					href={`/product/${product.slug}`}
					aria-label={product.name}
				>
					Add to cart
				</Link>
				{product?.images && (
					<Image
						className='absolute hidden md:block -top-6 right-0 translate-x-1/3'
						alt={product.name || 'Product Image'}
						src={product.images[0]?.url || placeholderImg}
						height={320}
						width={320}
						quality='85'
						{...imgProps}
					/>
				)}
			</div>
		);

	return (
		<Link
			className={className}
			href={`/product/${product.slug}`}
			aria-label={product.name}
		>
			{variant === 'simple' && (
				<>
					<div className='w-full p-2 hover:shadow-lg hover:bg-neutral-100 overflow-hidden transition duration-300 rounded-2xl '>
						{product?.images && (
							<Image
								className='mx-auto'
								alt={product.name || 'Product Image'}
								src={product.images[0]?.url || placeholderImg}
								height={540}
								width={540}
								quality='85'
								{...imgProps}
							/>
						)}
					</div>
					{!noNameTag && (
						<div className='flex flex-col max-w-fit mx-auto mt-5 items-center gap-y-2'>
							<h3 className='font-semibold text-xl'>
								{product.name}
							</h3>
							<ProductTypePill
								productType={product.productType}
							/>
							<div className='font-semibold text-xl'>{`${price}`}</div>
						</div>
					)}
				</>
			)}

			{variant === 'slim' && (
				<>
					<div>
						<span>{product.name}</span>
					</div>
					{product?.images && (
						<Image
							quality='85'
							src={product.images[0]?.url || placeholderImg}
							alt={product.name || 'Product Image'}
							height={320}
							width={320}
							{...imgProps}
						/>
					)}
				</>
			)}
			{variant === 'default' && (
				<>
					{process.env.COMMERCE_WISHLIST_ENABLED && (
						<WishlistButton
							productId={product.id}
							variant={product.variants[0] as any}
						/>
					)}
					<ProductTag name={product.name} price={`${price}`} />
					<div>
						{product?.images && (
							<Image
								alt={product.name || 'Product Image'}
								src={product.images[0]?.url || placeholderImg}
								height={540}
								width={540}
								quality='85'
								{...imgProps}
							/>
						)}
					</div>
				</>
			)}
		</Link>
	);
};

export default ProductCard;
