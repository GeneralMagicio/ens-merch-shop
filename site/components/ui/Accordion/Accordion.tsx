import cn from 'clsx'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from '@components/icons'

interface AccordionProps {
  className?: string
  items: {
    title: string
    description: string
  }[]
}

interface AccordionItemProps {
  title: string
  children: React.ReactNode
}

export const Accordion = ({ className, items }: AccordionProps) => {
  return (
    <div className={cn('w-full flex flex-col space-y-4', className)}>
      {items.map((item) => (
        <AccordionItem key={item.title} title={item.title}>
          {item.description}
        </AccordionItem>
      ))}
    </div>
  )
}

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border rounded-lg border-gray-200">
      <button
        className="w-full py-4 px-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="text-black">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
          <span className="ml-3 text-black font-medium">{title}</span>
        </div>
      </button>
      {isOpen && (
        <div className="pl-14 pt-2 pr-1 pb-6 opacity-70">{children}</div>
      )}
    </div>
  )
}
