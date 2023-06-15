const InfoStyled = ({ ...props }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none' {...props}>
			<path
				fill='#3889FF'
				d='M14 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM14 10.5a1.5 1.5 0 0 0-2.658-.953c-.19.23-.576.49-1.044.717a6.746 6.746 0 0 1-.742.303l-.004.002a1.5 1.5 0 0 0 .893 2.864l-.442-1.422.442 1.421h.002l.003-.001.009-.003.023-.007a5.35 5.35 0 0 0 .324-.115l.194-.075V17.5a1.5 1.5 0 0 0 3 0v-7Z'
			/>
			<path
				fill='#3889FF'
				fill-rule='evenodd'
				d='M12.5 24c6.627 0 12-5.373 12-12s-5.373-12-12-12S.5 5.373.5 12s5.373 12 12 12Zm0-3a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z'
				clip-rule='evenodd'
			/>
		</svg>
	)
}

export default InfoStyled
