const RatingHeartEmpty = ({ ...props }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='16'
			height='16'
			fill='none'
			{...props}
		>
			<g clip-path='url(#a)'>
				<path
					fill='#E8E8E8'
					fill-rule='evenodd'
					d='M2.525 3.566c-.422.565-.672 1.453-.431 2.654.07.349.293.85.691 1.483.387.617.896 1.29 1.463 1.971 1.134 1.362 2.447 2.694 3.354 3.574.226.22.57.22.796 0 .906-.88 2.22-2.212 3.353-3.574.567-.681 1.076-1.354 1.463-1.97.399-.634.622-1.135.692-1.484.24-1.201-.01-2.089-.431-2.654-.422-.567-1.079-.9-1.85-.9-1.324 0-1.926.55-2.238 1.02a2.611 2.611 0 0 0-.392 1.01V4.7a1 1 0 0 1-1.99-.004 2.325 2.325 0 0 0-.061-.282 2.611 2.611 0 0 0-.331-.728c-.313-.47-.914-1.02-2.238-1.02-.772 0-1.428.333-1.85.9ZM8 2.206c.703-.84 1.85-1.54 3.625-1.54 1.377 0 2.638.611 3.453 1.704s1.122 2.58.789 4.243c-.141.706-.518 1.453-.96 2.155-.45.718-1.02 1.466-1.618 2.185-1.199 1.44-2.57 2.828-3.498 3.73a2.562 2.562 0 0 1-3.583 0c-.928-.902-2.298-2.29-3.497-3.73-.599-.72-1.168-1.467-1.62-2.185-.44-.702-.817-1.449-.959-2.155C-.2 4.951.106 3.463.922 2.37 1.735 1.277 2.997.667 4.374.667c1.774 0 2.922.699 3.625 1.539Z'
					clip-rule='evenodd'
				/>
			</g>
			<defs>
				<clipPath id='a'>
					<path fill='#fff' d='M0 0h16v16H0z' />
				</clipPath>
			</defs>
		</svg>
	);
};

export default RatingHeartEmpty;
