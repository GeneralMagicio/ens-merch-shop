import { memo } from 'react';
import { Swatch } from '@components/product';
import { SelectedOptions } from '../helpers';
import type { ProductOption } from '@commerce/types/product';

interface ProductOptionsProps {
	options: ProductOption[];
	selectedOptions: SelectedOptions;
	setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>;
	setSelectedColor: (color: string) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
	options,
	selectedOptions,
	setSelectedOptions,
	setSelectedColor,
}) => {
	return (
		<div>
			{options.map(opt => (
				<div className='pb-4' key={opt.displayName}>
					<h2 className='capitalize font-bold text-lg tracking-wide'>
						{opt.displayName}
					</h2>
					<div
						role='listbox'
						className='flex flex-row flex-wrap gap-2 py-4'
					>
						{opt.values.map((v, i: number) => {
							const active =
								selectedOptions[opt.displayName.toLowerCase()];
							return (
								<Swatch
									key={`${opt.id}-${i}`}
									active={v.label.toLowerCase() === active}
									variant={opt.displayName}
									color={v.hexColors ? v.hexColors[0] : ''}
									label={v.label}
									onClick={() => {
										if (opt.displayName === 'color')
											setSelectedColor(v.label);
										setSelectedOptions(selectedOptions => {
											return {
												...selectedOptions,
												[opt.displayName.toLowerCase()]:
													v.label.toLowerCase(),
											};
										});
									}}
								/>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
};

export default memo(ProductOptions);
