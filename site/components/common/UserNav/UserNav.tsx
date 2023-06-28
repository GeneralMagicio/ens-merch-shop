import cn from 'clsx';
import useCart from '@framework/cart/use-cart';
import useCustomer from '@framework/customer/use-customer';
import React from 'react';
import s from './UserNav.module.css';
import { Avatar } from '@components/common';
import { useUI } from '@components/ui/context';
import { Bag, Menu } from '@components/icons';
import CustomerMenuContent from './CustomerMenuContent';
import {
	Dropdown,
	DropdownTrigger as DropdownTriggerInst,
	Button,
} from '@components/ui';

import SwitchCurrency from '../SwitchCurrency/SwitchCurrency';
import SignInButton from '../SignInButton/SignInButton';
import type { LineItem } from '@commerce/types/cart';

const countItem = (count: number, item: LineItem) => count + item.quantity;

const UserNav: React.FC<{
	className?: string;
	variant?: 'default' | 'light';
	isMobile?: boolean;
	onClose?: () => any;
}> = ({ className, variant = 'default', isMobile = false, onClose }) => {
	const { data } = useCart();
	const { data: isCustomerLoggedIn } = useCustomer();
	const { openModal, setSidebarView, openSidebar } = useUI();

	const itemsCount = data?.lineItems?.reduce(countItem, 0) ?? 0;
	const DropdownTrigger = isCustomerLoggedIn
		? DropdownTriggerInst
		: React.Fragment;

	return (
		<nav className={cn(s.root, className)}>
			<ul
				className={cn(
					'flex items-center gap-4',
					isMobile && 'flex-wrap',
				)}
			>
				{!isMobile && (
					<li className={s.mobileMenu}>
						<Button
							className={s.item}
							aria-label='Menu'
							variant='naked'
							onClick={() => {
								setSidebarView('MOBILE_MENU_VIEW');
								openSidebar();
							}}
						>
							<Menu variant={variant} />
						</Button>
					</li>
				)}
				{process.env.COMMERCE_CART_ENABLED && (
					<li
						className={cn(
							'items-center relative',
							isMobile ? 'flex' : 'hidden lg:flex',
						)}
					>
						<Button
							variant='naked'
							onClick={() => {
								setSidebarView('CART_VIEW');
								openSidebar();
							}}
							aria-label={`Cart items: ${itemsCount}`}
						>
							<Bag variant={variant} />
							{itemsCount > 0 && (
								<span className='absolute -top-[10px] -right-[10px] bg-red w-5 h-5 text-xs font-bold text-white rounded-full flex items-center justify-center'>
									{itemsCount}
								</span>
							)}
						</Button>
					</li>
				)}
				{process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
					<li className={cn(!isMobile && 'hidden lg:block')}>
						<Dropdown>
							<DropdownTrigger>
								<button
									aria-label='Menu'
									className={s.avatarButton}
									onClick={() =>
										isCustomerLoggedIn ? null : openModal()
									}
								>
									<Avatar variant={variant} />
								</button>
							</DropdownTrigger>
							<CustomerMenuContent onClose={onClose} />
						</Dropdown>
					</li>
				)}
				<li className={cn(!isMobile && 'hidden lg:block')}>
					<SwitchCurrency />
				</li>
				<li className={cn(!isMobile && 'hidden lg:block')}>
					<SignInButton variant={variant} />
				</li>
			</ul>
		</nav>
	);
};

export default UserNav;
