import { FC, useRef } from 'react'
import { useUserAvatar } from '@lib/hooks/useUserAvatar'
import cn from 'clsx'

interface Props {
  className?: string
  children?: any
  variant?: 'default' | 'light'
}

const Avatar: FC<Props> = ({ variant = 'default' }) => {
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  let { userAvatar } = useUserAvatar()

  return (
    <div
      ref={ref}
      style={{ backgroundImage: userAvatar }}
      className={cn(
        'inline-block h-8 w-8 rounded-full border-2 hover:scale-110 focus:border-secondary transition-all ease-linear',
        variant === 'default' ? 'border-blue-primary' : 'border-primary'
      )}
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
