import cn from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CommerceProvider } from '@framework';
import s from './Layout.module.css';
import LoginView from '@components/auth/LoginView';
import { useUI } from '@components/ui/context';
import { Navbar, Footer } from '@components/common';
import ShippingView from '@components/checkout/ShippingView';
import CartSidebarView from '@components/cart/CartSidebarView';
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies';
import { Sidebar, LoadingDots } from '@components/ui';
import PaymentMethodView from '@components/checkout/PaymentMethodView';
import CheckoutSidebarView from '@components/checkout/CheckoutSidebarView';
import { CheckoutProvider } from '@components/checkout/context';
import { MenuSidebarView } from '@components/common/UserNav';
import type { Category } from '@commerce/types/site';
import type { Link as LinkProps } from '../UserNav/MenuSidebarView';
import type { Page } from '@commerce/types/page';

const Loading = () => (
	<div className='w-80 h-80 flex items-center text-center justify-center p-3'>
		<LoadingDots />
	</div>
);

const dynamicProps = {
	loading: Loading,
};

const SignUpView = dynamic(() => import('@components/auth/SignUpView'), {
	...dynamicProps,
});

const ForgotPassword = dynamic(
	() => import('@components/auth/ForgotPassword'),
	{
		...dynamicProps,
	},
);

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
	...dynamicProps,
});

const Modal = dynamic(() => import('@components/ui/Modal'), {
	...dynamicProps,
	ssr: false,
});

interface Props {
	pageProps: {
		pages?: Page[];
		categories: Category[];
	};
	children?: React.ReactNode;
}

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
	modalView,
	closeModal,
}) => {
	return (
		<Modal onClose={closeModal}>
			{modalView === 'LOGIN_VIEW' && <LoginView />}
			{modalView === 'SIGNUP_VIEW' && <SignUpView />}
			{modalView === 'FORGOT_VIEW' && <ForgotPassword />}
		</Modal>
	);
};

const ModalUI: React.FC = () => {
	const { displayModal, closeModal, modalView } = useUI();
	return displayModal ? (
		<ModalView modalView={modalView} closeModal={closeModal} />
	) : null;
};

const SidebarView: React.FC<{
	sidebarView: string;
	closeSidebar(): any;
	links: LinkProps[];
}> = ({ sidebarView, closeSidebar, links }) => {
	return (
		<Sidebar onClose={closeSidebar}>
			{sidebarView === 'CART_VIEW' && <CartSidebarView />}
			{sidebarView === 'SHIPPING_VIEW' && <ShippingView />}
			{sidebarView === 'PAYMENT_VIEW' && <PaymentMethodView />}
			{sidebarView === 'CHECKOUT_VIEW' && <CheckoutSidebarView />}
			{sidebarView === 'MOBILE_MENU_VIEW' && (
				<MenuSidebarView links={links} />
			)}
		</Sidebar>
	);
};

const SidebarUI: React.FC<{ links: LinkProps[] }> = ({ links }) => {
	const { displaySidebar, closeSidebar, sidebarView } = useUI();
	return displaySidebar ? (
		<SidebarView
			links={links}
			sidebarView={sidebarView}
			closeSidebar={closeSidebar}
		/>
	) : null;
};

const Layout: React.FC<Props> = ({
	children,
	pageProps: { categories = [] },
}) => {
	const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
	const { locale = 'en-US', pathname } = useRouter();
	const navBarlinks = categories.slice(0, 2).map(c => ({
		label: c.name,
		href: `/search/${c.slug}`,
	}));

	return (
		<CommerceProvider locale={locale}>
			<div className={cn(s.root)}>
				<Navbar links={navBarlinks} isHomePage={pathname === '/'} />
				<main className='fit'>{children}</main>
				<Footer />
				<ModalUI />
				<CheckoutProvider>
					<SidebarUI links={navBarlinks} />
				</CheckoutProvider>
				<FeatureBar
					hide={acceptedCookies}
					action={
						<button
							className='mx-5 bg-blue-primary px-8 py-5 rounded-lg'
							onClick={() => onAcceptCookies()}
						>
							<span className='text-white text-lg font-bold'>
								Accept cookies
							</span>
						</button>
					}
				>
					This site uses cookies to improve your experience. By
					clicking, you agree to our{' '}
					<Link
						className='font-bold text-blue-primary'
						href='/cookies'
					>
						Privacy Policy.
					</Link>
				</FeatureBar>
			</div>
		</CommerceProvider>
	);
};

export default Layout;
