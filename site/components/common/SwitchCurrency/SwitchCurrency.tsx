import { FC, useState } from 'react'
import * as Switch from '@radix-ui/react-switch'

const SwitchCurrency: FC = () => {
  const [checked, setChecked] = useState(false)
  console.log(checked)
  return (
    <form>
      <div
        className="flex items-center"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <label
          className="text-white text-[15px] leading-none pr-[15px]"
          htmlFor="airplane-mode"
        >
          Airplane mode
        </label>
        <Switch.Root
          checked={checked}
          onCheckedChange={setChecked}
          className="w-[42px] h-[25px] bg-blackA9 rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
          id="airplane-mode"
        >
          <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:bg-red-500" />
        </Switch.Root>
      </div>
    </form>
  )
}

export default SwitchCurrency
