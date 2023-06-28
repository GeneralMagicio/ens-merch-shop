import { FC } from 'react';
import Link from 'next/link';
import { Discord, Twitter, GM } from '@components/icons';
import { Logo } from '@components/ui';

const primaryLinks = [
	{
		name: 'Refund and Returns',
		url: '/refund',
	},
	{
		name: 'Report an Issue',
		url: 'https://github.com/GeneralMagicio/ens-merch-shop/issues/new?assignees=&labels=template%3A+story&template=3.feature_request.yml',
	},
	{
		name: 'FAQ',
		url: '/faq',
	},
	{
		name: 'Contact',
		url: '/contact-us',
	},
];

const secondaryLinks = [
	{
		name: 'About',
		url: '/about',
	},
	{
		name: 'Terms of use',
		url: '/terms-of-use',
	},
	{
		name: 'Privacy policy',
		url: '/privacy-policy',
	},
	{
		name: 'Cookies',
		url: '/cookies',
	},
];

const socialLinks = [
	{
		name: 'Twitter',
		url: 'https://twitter.com/ensdomains',
		icon: <Twitter color='white' />,
	},
	{
		name: 'Discord',
		url: 'https://chat.ens.domains/',
		icon: <Discord />,
	},
];

const Footer: FC = () => {
	return (
		<footer className='bg-blue-primary flex items-center lg:h-[348px]'>
			<div className='px-12 grid grid-cols-1 lg:grid-cols-12'>
				<div className='flex my-12 lg:mt-0 h-24 flex-col lg:h-44 justify-between col-span-1 lg:col-span-2'>
					<Link href='/'>
						<Logo variant='light' />
					</Link>
					<div className='flex gap-x-5 items-center'>
						{socialLinks.map(({ icon, name, url }) => (
							<Link
								className='transition duration-200 hover:scale-110 hover:opacity-60'
								href={url}
								key={name}
								target='_blank'
								rel='noopener noreferrer'
							>
								{icon}
							</Link>
						))}
					</div>
				</div>
				<div className='col-span-1 flex flex-col gap-y-6 lg:col-start-5'>
					{primaryLinks.map(({ name, url }) => (
						<Link
							href={url}
							key={name}
							className={
								'font-medium font-lg text-white transition duration-200 hover:opacity-60'
							}
							target={url.includes('http') ? '_blank' : '_self'}
							rel={'noopener noreferrer'}
						>
							{name}
						</Link>
					))}
				</div>
				<div className='col-span-1 mt-10 lg:mt-0 flex flex-col gap-y-6 lg:col-start-8'>
					{secondaryLinks.map(({ name, url }) => (
						<Link
							href={url}
							key={name}
							className={
								'font-medium font-lg text-white transition duration-200 hover:opacity-60'
							}
							target={url.includes('http') ? '_blank' : '_self'}
							rel='noopener noreferrer'
						>
							{name}
						</Link>
					))}
				</div>
				<div className='col-span-1 flex flex-col lg:col-start-12'>
					<div className='flex gap-x-2 my-10 lg:mt-32 lg:mb-0 items-center'>
						<p className='text-white font-medium text-xs'>
							Built by
						</p>
						<Link
							href={'https://www.generalmagic.io/'}
							className='transition duration-200 hover:scale-110 hover:opacity-60'
							target='_blank'
							rel='noopener noreferrer'
						>
							<GM />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
