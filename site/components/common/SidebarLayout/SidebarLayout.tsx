import React, { FC, ReactNode } from 'react';
import cn from 'clsx';
import { Cross, ChevronLeft } from '@components/icons';
import { UserNav } from '@components/common';
import s from './SidebarLayout.module.css';

type ComponentProps = { className?: string; children?: ReactNode } & (
	| { handleClose: () => any; handleBack?: never }
	| { handleBack: () => any; handleClose?: never }
);

const SidebarLayout: FC<ComponentProps> = ({
	children,
	className,
	handleBack,
	handleClose,
}) => {
	return (
		<div className={cn(s.root, className)}>
			<header className={s.header}>
				{handleClose && (
					<button
						onClick={handleClose}
						aria-label='Close'
						className='hover:text-accent-5 text-blue-primary transition ease-in-out duration-150 flex items-center focus:outline-none mr-6'
					>
						<Cross className='h-6 w-6 hover:text-accent-3' />
						<span className='ml-2 text-lg font-medium'>Close</span>
					</button>
				)}
				{handleBack && (
					<button
						onClick={handleBack}
						aria-label='Go back'
						className='hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none'
					>
						<ChevronLeft className='h-6 w-6 hover:text-accent-3' />
						<span className='ml-2 text-accent-7 text-xs'>Back</span>
					</button>
				)}

				<UserNav isMobile onClose={handleClose} className='bg-white' />
			</header>
			<div className={s.container}>{children}</div>
		</div>
	);
};

export default SidebarLayout;
