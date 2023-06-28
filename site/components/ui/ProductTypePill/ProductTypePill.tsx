import cn from 'clsx';

interface ProductTypePillProps {
	productType: string | undefined;
}

const ProductTypePill = ({ productType }: ProductTypePillProps) => {
	const isCustomizable = productType === 'Customizable';

	if (!productType) return null;
	return (
		<div
			className={cn(
				'font-bold text-sm py-1 px-2 rounded-full max-w-fit',
				isCustomizable
					? 'bg-amber-100 text-yellow-900'
					: 'bg-blue-surface text-blue-primary',
			)}
		>
			{productType}
		</div>
	);
};

export default ProductTypePill;
