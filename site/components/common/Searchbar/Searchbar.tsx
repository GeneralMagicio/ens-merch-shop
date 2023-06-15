import { FC, memo, useEffect } from 'react'
import { useRouter } from 'next/router'
import cn from 'clsx'
import { MagnifyingGlass } from '@components/icons'

interface Props {
	className?: string
	id?: string
	variant?: 'default' | 'light'
}

const Searchbar: FC<Props> = ({ className, id = 'search', variant = 'default' }) => {
	const router = useRouter()

	useEffect(() => {
		router.prefetch('/search')
	}, [router])

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault()

		if (e.key === 'Enter') {
			const q = e.currentTarget.value

			router.push(
				{
					pathname: `/search`,
					query: q ? { q } : {},
				},
				undefined,
				{ shallow: true },
			)
		}
	}

	return (
		<div className='w-full relative flex items-center'>
			<label className='hidden' htmlFor={id}>
				Search
			</label>
			<input
				id={id}
				className={cn(
					'font-medium text-base pl-10 w-full rounded-lg border p-3 focus:outline-none bg-transparent',
					variant === 'default'
						? 'border-blue-primary text-blue-primary placeholder:text-blue-primary'
						: 'border-blue-surface text-blue-surface placeholder:text-blue-surface',
				)}
				placeholder='Search for products...'
				defaultValue={router.query.q}
				onKeyUp={handleKeyUp}
			/>
			<div className='absolute left-4'>
				<MagnifyingGlass variant={variant} />
			</div>
		</div>
	)
}

export default memo(Searchbar)
