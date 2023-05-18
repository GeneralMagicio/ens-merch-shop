import { useMemo } from 'react'
import { useCommerce } from '..'
import { useEthPrice } from '../../../../site/lib/hooks/useEthPrice'

export function formatPrice({
  amount,
  currencyCode,
  locale,
}: {
  amount: number
  currencyCode: string
  locale: string
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 3,
    minimumFractionDigits: 2,
  })

  return formatCurrency.format(amount)
}

export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale,
}: {
  baseAmount: number
  amount: number
  currencyCode: string
  locale: string
}) {
  const hasDiscount = baseAmount > amount
  const formatDiscount = new Intl.NumberFormat(locale, { style: 'percent' })
  const discount = hasDiscount
    ? formatDiscount.format((baseAmount - amount) / baseAmount)
    : null

  const price = formatPrice({ amount, currencyCode, locale })
  const basePrice = hasDiscount
    ? formatPrice({ amount: baseAmount, currencyCode, locale })
    : null

  return { price, basePrice, discount }
}

export default function usePrice(
  data?: {
    selectedCurrency: 'USD' | 'ETH'
    amount: number
    baseAmount?: number
    currencyCode: string
  } | null
) {
  const { amount, baseAmount, currencyCode, selectedCurrency } = data ?? {}
  const isEthPrice = selectedCurrency === 'ETH'

  const { locale } = useCommerce()
  const { data: ethPrice } = useEthPrice()
  const ethPriceUsd = ethPrice?.ethereum.usd

  const ethCurrencyCode = 'ETH'
  const ethAmount = amount && ethPriceUsd ? amount / ethPriceUsd : 0
  const ethBaseAmount = baseAmount && ethPriceUsd ? baseAmount / ethPriceUsd : 0

  const selectedAmount = isEthPrice ? ethAmount : amount
  const selectedBaseAmount = isEthPrice ? ethBaseAmount : baseAmount

  const selectedCurrencyCode = isEthPrice ? ethCurrencyCode : currencyCode

  const value = useMemo(() => {
    if (typeof selectedAmount !== 'number' || !selectedCurrencyCode) return ''

    return selectedBaseAmount
      ? formatVariantPrice({
          amount: selectedAmount,
          baseAmount: selectedBaseAmount,
          currencyCode: selectedCurrencyCode,
          locale,
        })
      : formatPrice({
          amount: selectedAmount,
          currencyCode: selectedCurrencyCode,
          locale,
        })
  }, [selectedAmount, selectedBaseAmount, selectedCurrencyCode, ethPrice])

  return typeof value === 'string' ? { price: value } : value
}
