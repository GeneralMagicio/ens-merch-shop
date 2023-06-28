import { FC } from 'react';
import Link from 'next/link';
import cn from 'clsx';
import { Logo, Container } from '@components/ui';
import { Searchbar, UserNav } from '@components/common';
import useScroll from '@lib/hooks/useScroll';

interface Link {
	href: string;
	label: string;
}

interface NavbarProps {
	links?: Link[];
	isHomePage?: boolean;
}

const Navbar: FC<NavbarProps> = ({ links, isHomePage }) => {
	const scrolled = useScroll(700);
	const variant = !isHomePage || scrolled ? 'default' : 'light';
	return (
		<Container
			clean
			className={`w-full inset-0 fixed z-20 lg:max-h-24 max-h-32 ${
				variant === 'default' ? 'bg-white' : 'backdrop-blur'
			} border-gray-200 mx-auto max-w-8xl px-6 lg:px-12`}
		>
			<div className='flex items-center justify-between h-16 lg:h-24'>
				<Link className='hidden xl:block' href='/' aria-label='Logo'>
					<Logo variant={variant} />
				</Link>
				<Link
					className='block xl:hidden min-w-fit '
					href='/'
					aria-label='Logo'
				>
					<Logo variant={variant} size='small' />
				</Link>
				{process.env.COMMERCE_SEARCH_ENABLED && (
					<div className='justify-center flex-1 hidden lg:flex max-w-[450px] px-4'>
						<Searchbar variant={variant} />
					</div>
				)}
				<div className='flex items-center justify-between'>
					<nav
						className={cn(
							'justify-center font-bold text-lg hidden mr-6 lg:flex items-center gap-x-5 flex-1',
							variant === 'default'
								? 'text-blue-primary'
								: 'text-blue-surface',
						)}
					>
						{links?.map(l => (
							<Link href={l.href} key={l.href}>
								{l.label}
							</Link>
						))}
					</nav>
					<div className='flex items-center justify-end flex-1 space-x-8'>
						<UserNav variant={variant} />
					</div>
				</div>
			</div>
			{process.env.COMMERCE_SEARCH_ENABLED && (
				<div className='flex pb-4 lg:px-6 lg:hidden'>
					<Searchbar variant={variant} id='mobile-search' />
				</div>
			)}
		</Container>
	);
};

export default Navbar;
