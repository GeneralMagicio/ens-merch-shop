import cn from 'clsx'
import { useRouter } from 'next/router'
import useLogout from '@framework/auth/use-logout'
import s from './CustomerMenuContent.module.css'
import { DropdownContent, DropdownMenuItem } from '@components/ui/Dropdown/Dropdown'

const LINKS = [
	{
		name: 'My Orders',
		href: '/orders',
	},
	{
		name: 'My Profile',
		href: '/profile',
	},
	{
		name: 'My Cart',
		href: '/cart',
	},
]

interface Props {
	onClose?: () => any
}

export default function CustomerMenuContent({ onClose }: Props) {
	const router = useRouter()
	const logout = useLogout()
	const { pathname } = useRouter()

	function handleClick(_: React.MouseEvent<HTMLAnchorElement>, href: string) {
		onClose?.()
		router.push(href)
	}

	return (
		<DropdownContent
			className='rounded-lg overflow-hidden drop-shadow-md'
			sideOffset={10}
			id='CustomerMenuContent'
		>
			{LINKS.map(({ name, href }) => (
				<DropdownMenuItem key={href}>
					<a
						className={cn(s.link, {
							[s.active]: pathname === href,
						})}
						onClick={e => handleClick(e, href)}
					>
						{name}
					</a>
				</DropdownMenuItem>
			))}
			<DropdownMenuItem>
				<a
					className={cn(s.link, 'border-t border-accent-2 mt-4')}
					onClick={() => {
						router.push('/')
						logout()
					}}
				>
					Logout
				</a>
			</DropdownMenuItem>
		</DropdownContent>
	)
}
