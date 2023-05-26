import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
import { useCurrencyContext } from '@lib/hooks/useCurrencyContext'

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const { data, isLoading, isEmpty } = useCart()
  const { priceCurrency } = useCurrencyContext()

  const { price: subTotal } = usePrice(
    data && {
      selectedCurrency: priceCurrency,
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      selectedCurrency: priceCurrency,
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  const error = null
  const success = null

  return (
    <SidebarLayout
      className={cn(
        {
          [s.empty]: error || success || isLoading || isEmpty,
        },
        'px-2 sm:overflow-y-hidden'
      )}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-whi te rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <div className="flex flex-col sm:max-h-[80%] justify-between">
          <div className="w-full mt-24 sm:mt-0 px-4 sm:px-6">
            <Link href="/cart">
              <Text variant="sectionHeading" onClick={handleClose}>
                My Cart
              </Text>
            </Link>
            <div className="flex mb-2 items-center text-xs font-medium text-zinc-400 justify-between">
              <p className="w-64">Products</p>
              <p className="w-20">Qty</p>
              <p className="w-24">Unit Price</p>
            </div>
          </div>
          <div className="px-4 sm:px-6 overflow-y-scroll ">
            <ul className="flex flex-col space-y-2">
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>
          <div className="px-6 bg-white py-4 w-full  text-lg">
            <ul>
              <li className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-2">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-2">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </li>
            </ul>
            <div className="flex justify-between py-2 font-bold mb-2">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <div className="mt-6 mb-8">
              {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                <Button Component="a" width="100%" onClick={goToCheckout}>
                  Proceed to Checkout ({total})
                </Button>
              ) : (
                <Link href="/checkout">
                  <button className="block w-full font-bold py-4 rounded-lg text-white bg-blue-primary">
                    Proceed to Checkout
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
