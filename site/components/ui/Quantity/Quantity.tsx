import React, { FC } from 'react';
import cn from 'clsx';
import s from './Quantity.module.css';
import { Plus, Minus } from '@components/icons';
export interface QuantityProps {
	value: number;
	increase: () => any;
	decrease: () => any;
	handleRemove: React.MouseEventHandler<HTMLButtonElement>;
	handleChange: React.ChangeEventHandler<HTMLInputElement>;
	max?: number;
}

const Quantity: FC<QuantityProps> = ({
	value,
	increase,
	decrease,
	handleChange,
	max = 6,
}) => {
	return (
		<div className='flex flex-row h-9'>
			<label className='w-ful max-w-4 border-accent-2 border ml-2'>
				<input
					className={s.input}
					onChange={e =>
						Number(e.target.value) < max + 1
							? handleChange(e)
							: () => {}
					}
					value={value}
					type='number'
					max={max}
					min='0'
					readOnly
				/>
			</label>
			<button
				type='button'
				onClick={decrease}
				className={s.actions}
				style={{ marginLeft: '-1px' }}
				disabled={value <= 1}
			>
				<Minus width={18} height={18} />
			</button>
			<button
				type='button'
				onClick={increase}
				className={cn(s.actions)}
				style={{ marginLeft: '-1px' }}
				disabled={value < 1 || value >= max}
			>
				<Plus width={18} height={18} />
			</button>
		</div>
	);
};

export default Quantity;
