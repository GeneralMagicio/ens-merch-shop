interface MenuProps {
	variant?: 'default' | 'light'
}

const Menu = ({ variant = 'default' }: MenuProps) => {
	if (variant === 'default')
		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-6 w-6]'
				fill='none'
				viewBox='0 0 24 24'
				stroke='#3889FF'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M4 6h16M4 12h16m-7 6h7'
				/>
			</svg>
		)

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='h-6 w-6]'
			fill='none'
			viewBox='0 0 24 24'
			stroke='#ffffff'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M4 6h16M4 12h16m-7 6h7'
			/>
		</svg>
	)
}

export default Menu
