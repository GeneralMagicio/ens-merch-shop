import { ReactNode } from 'react'
import cn from 'clsx'
import s from './FeatureBar.module.css'

interface FeatureBarProps {
	className?: string
	children?: ReactNode
	hide?: boolean
	action?: React.ReactNode
}

const FeatureBar: React.FC<FeatureBarProps> = ({ children, className, action, hide }) => {
	const rootClassName = cn(
		s.root,
		{
			transform: true,
			'translate-y-0 opacity-100': !hide,
			'translate-y-full opacity-0': hide,
		},
		className,
	)
	return (
		<div className={rootClassName}>
			<span className='block md:inline'>{children}</span>
			{action && action}
		</div>
	)
}

export default FeatureBar
