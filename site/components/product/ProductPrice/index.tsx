import { Product } from '@commerce/types/product';
import usePrice from '@framework/product/use-price';
import { useCurrencyContext } from '@lib/hooks/useCurrencyContext';

interface ProductPriceProps {
	product: Product;
}

const ProductPrice = ({ product }: ProductPriceProps) => {
	const { priceCurrency } = useCurrencyContext();

	const { price } = usePrice({
		selectedCurrency: priceCurrency,
		amount: product.price.value,
		baseAmount: product.price.retailPrice,
		currencyCode: product.price.currencyCode!,
	});

	return (
		<div className='mb-8'>
			<h2 className='capitalize font-bold text-lg tracking-wide'>
				Price
			</h2>
			<div>{price}</div>
		</div>
	);
};

export default ProductPrice;
