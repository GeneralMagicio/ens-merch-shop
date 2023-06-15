const Cross = ({ ...props }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' {...props}>
			<g fill='#B6B6BF' clipPath='url(#a)'>
				<path d='M11.04 4.96a1 1 0 0 1 0 1.414L9.414 8l1.626 1.626a1 1 0 1 1-1.414 1.414L8 9.414 6.374 11.04A1 1 0 1 1 4.96 9.626L6.586 8 4.96 6.374A1 1 0 0 1 6.374 4.96L8 6.586 9.626 4.96a1 1 0 0 1 1.414 0Z' />
				<path
					fillRule='evenodd'
					d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm0-2A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z'
					clipRule='evenodd'
				/>
			</g>
			<defs>
				<clipPath id='a'>
					<path fill='#fff' d='M0 0h16v16H0z' />
				</clipPath>
			</defs>
		</svg>
	)
}

export default Cross
