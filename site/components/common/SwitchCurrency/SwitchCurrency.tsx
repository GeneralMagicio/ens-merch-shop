import { FC, useState } from 'react'
import * as Switch from '@radix-ui/react-switch'
import cn from 'clsx'

const SwitchCurrency: FC = () => {
  const [checked, setChecked] = useState(false)

  return (
    <form>
      <div className="flex items-center">
        <Switch.Root
          checked={checked}
          onCheckedChange={setChecked}
          className="relative w-28 h-10 rounded-lg bg-neutral-100"
        >
          <div className="flex justify-between px-4 font-bold text-sm text-zinc-400">
            <span>ETH</span>
            <span>USD</span>
          </div>
          <Switch.Thumb
            className={cn(
              'flex items-center justify-center absolute left-1 top-1 bg-blue-primary rounded-md w-12 h-8 transition-transform duration-200 text-white font-bold text-sm',
              !checked && 'translate-x-14'
            )}
          >
            {checked ? 'ETH' : 'USD'}
          </Switch.Thumb>
        </Switch.Root>
      </div>
    </form>
  )
}

export default SwitchCurrency
