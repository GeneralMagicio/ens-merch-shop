const Share = ({ ...props }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='16'
			height='16'
			fill='currentColor'
			{...props}
		>
			<path
				fill='#3889FF'
				d='M8.333.667a1 1 0 0 0 0 2h3.586L5.626 8.96a1 1 0 1 0 1.414 1.414l6.293-6.293v3.586a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1h-6Z'
			/>
			<path
				fill='#3889FF'
				d='M2.667 7a1 1 0 0 1 1-1H5a1 1 0 0 0 0-2H3.667a3 3 0 0 0-3 3v5.333a3 3 0 0 0 3 3H9a3 3 0 0 0 3-3V11a1 1 0 1 0-2 0v1.333a1 1 0 0 1-1 1H3.667a1 1 0 0 1-1-1V7Z'
			/>
		</svg>
	)
}

export default Share
