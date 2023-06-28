import { ChangeEvent, useEffect, useState } from 'react';
import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import usePrice from '@framework/product/use-price';
import useUpdateItem from '@framework/cart/use-update-item';
import useRemoveItem from '@framework/cart/use-remove-item';
import { useUI } from '@components/ui/context';
import s from './CartItem.module.css';
import { useCurrencyContext } from '@lib/hooks/useCurrencyContext';
import Quantity from '@components/ui/Quantity';
import { CrossCircle } from '@components/icons';
import type { LineItem } from '@commerce/types/cart';

type ItemOption = {
	name: string;
	nameId: number;
	value: string;
	valueId: number;
};

const placeholderImg = '/product-img-placeholder.svg';

const CartItem = ({
	item,
	variant = 'default',
	currencyCode,
	...rest
}: {
	variant?: 'default' | 'display';
	item: LineItem;
	currencyCode: string;
}) => {
	const { closeSidebarIfPresent } = useUI();
	const [removing, setRemoving] = useState(false);
	const [quantity, setQuantity] = useState<number>(item.quantity);
	const removeItem = useRemoveItem();
	const updateItem = useUpdateItem({ item });
	const { priceCurrency } = useCurrencyContext();

	const { price } = usePrice({
		selectedCurrency: priceCurrency,
		amount: item.variant.price * item.quantity,
		baseAmount: item.variant.listPrice * item.quantity,
		currencyCode,
	});

	const hasCustomizableOptions =
		item?.customAttributes && item.customAttributes?.length > 0;

	const handleChange = async ({
		target: { value },
	}: ChangeEvent<HTMLInputElement>) => {
		setQuantity(Number(value));
		await updateItem({ quantity: Number(value) });
	};

	const increaseQuantity = async (n = 1) => {
		const val = Number(quantity) + n;
		setQuantity(val);
		await updateItem({ quantity: val });
	};

	const handleRemove = async () => {
		setRemoving(true);
		try {
			await removeItem(item);
		} catch (error) {
			setRemoving(false);
		}
	};

	// TODO: Add a type for this
	const options = (item as any).options;

	useEffect(() => {
		// Reset the quantity state if the item quantity changes
		if (item.quantity !== Number(quantity)) {
			setQuantity(item.quantity);
		}
		// TODO: currently not including quantity in deps is intended, but we should
		// do this differently as it could break easily
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item.quantity]);

	return (
		<li
			className={cn({
				'opacity-50 pointer-events-none': removing,
			})}
			{...rest}
		>
			<div className='flex flex-row flex-wrap items-center gap-4 py-4'>
				<div className='w-16 h-16 relative overflow-hidden cursor-pointer'>
					<Link href={`/product/${item.path}`}>
						<Image
							onClick={() => closeSidebarIfPresent()}
							className={s.productImage}
							width={64}
							height={64}
							src={item.variant.image?.url || placeholderImg}
							alt={item.variant.image?.alt || 'Product Image'}
						/>
					</Link>
				</div>
				<div>
					<Link href={`/product/${item.path}`}>
						<span
							className={s.productName}
							onClick={() => closeSidebarIfPresent()}
						>
							{item.name}
						</span>
					</Link>
					{options && options.length > 0 && (
						<div className='flex items-center pb-1'>
							{options.map((option: ItemOption, i: number) => (
								<div
									key={`${item.id}-${option.name}`}
									className='text-sm font-semibold text-accent-7 inline-flex items-center justify-center'
								>
									{option.name}
									{option.name === 'Color' ? (
										<span
											className='mx-2 rounded-full bg-transparent border w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden'
											style={{
												backgroundColor: `${option.value}`,
											}}
										></span>
									) : (
										<span className='mx-2 rounded-full bg-transparent border h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden'>
											{option.value}
										</span>
									)}
									{i === options.length - 1 ? (
										''
									) : (
										<span className='mr-3' />
									)}
								</div>
							))}
						</div>
					)}
					{hasCustomizableOptions && (
						<div>
							{'Custom ENS name: ' +
								item.customAttributes![0].value}
						</div>
					)}
				</div>
			</div>
			<div className='flex'>
				<Quantity
					value={quantity}
					handleRemove={handleRemove}
					handleChange={handleChange}
					increase={() => increaseQuantity(1)}
					decrease={() => increaseQuantity(-1)}
				/>
				<div className='flex w-28 items-center space-x-2 justify-center text-lg font-bold'>
					<span>{price}</span>{' '}
					<button onClick={handleRemove}>
						<CrossCircle />
					</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
