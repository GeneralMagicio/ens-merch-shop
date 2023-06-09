const Exit = ({ ...props }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='20'
			height='20'
			fill='none'
			{...props}
		>
			<path
				fill='#3889FF'
				d='M3.75.833A3.75 3.75 0 0 0 0 4.583v10.834a3.75 3.75 0 0 0 3.75 3.75h4.167a3.75 3.75 0 0 0 3.75-3.75v-.834a1.25 1.25 0 0 0-2.5 0v.834c0 .69-.56 1.25-1.25 1.25H3.75c-.69 0-1.25-.56-1.25-1.25V4.583c0-.69.56-1.25 1.25-1.25h4.167c.69 0 1.25.56 1.25 1.25v.834a1.25 1.25 0 0 0 2.5 0v-.834a3.75 3.75 0 0 0-3.75-3.75H3.75Z'
			/>
			<path
				fill='#3889FF'
				d='M19.68 10.836a1.25 1.25 0 0 0-.099-1.77L15.42 5.322a1.25 1.25 0 1 0-1.672 1.858l1.745 1.571H7.917a1.25 1.25 0 1 0 0 2.5h7.576l-1.746 1.57a1.25 1.25 0 0 0 1.672 1.86l4.167-3.75c.033-.03.064-.062.094-.094Z'
			/>
		</svg>
	);
};

export default Exit;
