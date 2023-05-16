import cn from 'clsx'
import s from './UserNav.module.css'
import { Avatar } from '@components/common'
import useCart from '@framework/cart/use-cart'
import { useUI } from '@components/ui/context'
import { Bag, Menu } from '@components/icons'
import CustomerMenuContent from './CustomerMenuContent'
import useCustomer from '@framework/customer/use-customer'
import React from 'react'
import {
  Dropdown,
  DropdownTrigger as DropdownTriggerInst,
  Button,
} from '@components/ui'

import type { LineItem } from '@commerce/types/cart'
import SwitchCurrency from '../SwitchCurrency/SwitchCurrency'
import SignInButton from '../SignInButton/SignInButton'

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: React.FC<{
  className?: string
  variant?: 'default' | 'light'
}> = ({ className, variant = 'default' }) => {
  const { data } = useCart()
  const { data: isCustomerLoggedIn } = useCustomer()
  const { openModal, setSidebarView, openSidebar } = useUI()

  const itemsCount = data?.lineItems?.reduce(countItem, 0) ?? 0
  const DropdownTrigger = isCustomerLoggedIn
    ? DropdownTriggerInst
    : React.Fragment

  return (
    <nav className={cn(s.root, className)}>
      <ul className="flex items-center gap-x-4">
        {process.env.COMMERCE_CART_ENABLED && (
          <li className={s.item}>
            <Button
              variant="naked"
              onClick={() => {
                setSidebarView('CART_VIEW')
                openSidebar()
              }}
              aria-label={`Cart items: ${itemsCount}`}
            >
              <Bag variant={variant} />
              {itemsCount > 0 && (
                <span className="absolute -top-[10px] -right-[10px] bg-red w-5 h-5 text-xs font-bold text-white rounded-full flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Button>
          </li>
        )}
        {process.env.COMMERCE_CUSTOMERAUTH_ENABLED && (
          <li>
            <Dropdown>
              <DropdownTrigger>
                <button
                  aria-label="Menu"
                  className={s.avatarButton}
                  onClick={() => (isCustomerLoggedIn ? null : openModal())}
                >
                  <Avatar />
                </button>
              </DropdownTrigger>
              <CustomerMenuContent />
            </Dropdown>
          </li>
        )}
        <li className={s.mobileMenu}>
          <Button
            className={s.item}
            aria-label="Menu"
            variant="naked"
            onClick={() => {
              setSidebarView('MOBILE_MENU_VIEW')
              openSidebar()
            }}
          >
            <Menu />
          </Button>
        </li>
        <li>
          <SwitchCurrency />
        </li>
        <li>
          <SignInButton variant={variant} />
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
