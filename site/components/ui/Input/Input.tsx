import React, { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string
	onChange?: (...args: any[]) => any
}

const Input: React.FC<InputProps> = props => {
	const { className, children, onChange, ...rest } = props

	const handleOnChange = (e: any) => {
		if (onChange) {
			onChange(e.target.value)
		}
		return null
	}

	return (
		<label>
			<input
				className='border rounded-lg p-4 placeholder:text-zinc-400 text-zinc-500 font-medium text-base w-full'
				onChange={handleOnChange}
				autoComplete='off'
				autoCorrect='off'
				autoCapitalize='off'
				spellCheck='false'
				{...rest}
			/>
		</label>
	)
}

export default Input
