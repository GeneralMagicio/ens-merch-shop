import { FC, memo } from 'react';
import rangeMap from '@lib/range-map';
import { RatingHeartEmpty, RatingHeartFilled } from '@components/icons';

export interface RatingProps {
	value: number;
}

const Quantity: FC<RatingProps> = ({ value = 5 }) => (
	<div className='flex flex-row py-6 text-accent-9'>
		{rangeMap(5, i => (
			<span key={`star_${i}`} className={'inline-block ml-1 '}>
				{i >= Math.floor(value) ? (
					<RatingHeartEmpty />
				) : (
					<RatingHeartFilled />
				)}
			</span>
		))}
	</div>
);

export default memo(Quantity);
