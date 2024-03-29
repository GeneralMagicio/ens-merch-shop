import { useAddItem } from '@framework/cart';
import { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LoadingDots } from '@components/ui';
import { Text, useUI } from '@components/ui';
import { ProductOptions } from '@components/product';
import {
	getProductVariant,
	selectDefaultOptionFromProduct,
	SelectedOptions,
} from '../helpers';
import ErrorMessage from '@components/ui/ErrorMessage';
import Link from '@components/ui/Link/Link';
import { ArrowLeftBold } from '@components/icons';
import ProductTypePill from '@components/ui/ProductTypePill';
import ProductPrice from '@components/product/ProductPrice';
import ProductShareButton from '@components/product/ProductSidebar/ProductShareButton';
import type { Product } from '@commerce/types/product';

const DynamicSelectEnsName = dynamic(
	() => import('@components/ui/SelectEnsName'),
);

interface ProductSidebarProps {
	product: Product;
	className?: string;
	setSelectedColor: (color: string) => void;
}

const ProductSidebar: FC<ProductSidebarProps> = ({
	product,
	className,
	setSelectedColor,
}) => {
	const addItem = useAddItem();
	const { openSidebar, setSidebarView } = useUI();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | Error>(null);
	const [selectedEnsName, setSelectedEnsName] = useState<string>();
	const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

	const isCustomizable = product.productType === 'Customizable';

	useEffect(() => {
		selectDefaultOptionFromProduct(product, setSelectedOptions);
	}, [product]);

	const variant = getProductVariant(product, selectedOptions);
	const addToCart = async () => {
		setLoading(true);
		setError(null);
		try {
			await addItem({
				productId: String(product.id),
				variantId: String(
					variant ? variant.id : product.variants[0]?.id,
				),
				customAttributes: selectedEnsName
					? [
							{
								key: 'custom_ens_name',
								value: selectedEnsName,
							},
					  ]
					: undefined,
			});
			setSidebarView('CART_VIEW');
			openSidebar();
			setLoading(false);
		} catch (err) {
			setLoading(false);
			if (err instanceof Error) {
				console.error(err);
				setError({
					...err,
					message: 'Could not add item to cart. Please try again.',
				});
			}
		}
	};

	return (
		<div className={className}>
			<div className='flex mb-6 text-blue-primary text-sm font-medium items-center justify-between'>
				<div className='flex items-center'>
					<ArrowLeftBold className='mr-2' />
					<Link href='/search/products'>All Products</Link>
				</div>
				<ProductShareButton />
			</div>

			<h2 className='mt-6 mb-2 font-black text-4xl'>{product.name}</h2>
			<ProductTypePill productType={product.productType} />
			<Text
				className='pb-4 mt-6 break-words w-full max-w-xl'
				html={product.descriptionHtml || product.description}
			/>
			<ProductOptions
				options={product.options}
				selectedOptions={selectedOptions}
				setSelectedOptions={setSelectedOptions}
				setSelectedColor={setSelectedColor}
			/>
			<ProductPrice product={product} />
			{isCustomizable ? (
				<DynamicSelectEnsName
					selectedEnsName={selectedEnsName}
					setSelectedEnsName={setSelectedEnsName}
					error={error}
					onSuccess={addToCart}
					variant={variant}
					loading={loading}
				/>
			) : (
				<div>
					{error && <ErrorMessage error={error} className='my-5' />}
					<button
						aria-label='Add to Cart'
						type='button'
						className='w-full flex items-center justify-center font-bold py-4 rounded-lg text-white bg-blue-primary'
						onClick={addToCart}
						disabled={
							variant?.availableForSale === false || loading
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
			)}
		</div>
	);
};

export default ProductSidebar;
