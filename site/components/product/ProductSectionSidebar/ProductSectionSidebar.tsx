import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import type { Product } from '@commerce/types/product'
import { LoadingDots } from '@components/ui'
import { Text, useUI } from '@components/ui'
import { ProductOptions } from '@components/product'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ErrorMessage from '@components/ui/ErrorMessage'
import ProductTypePill from '@components/ui/ProductTypePill'

const DynamicSelectEnsName = dynamic(
  () => import('@components/ui/SelectEnsName')
)

interface ProductSectionSidebarProps {
  product: Product
  className?: string
}

const ProductSectionSidebar: FC<ProductSectionSidebarProps> = ({
  product,
  className,
}) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  const url = typeof window !== 'undefined' ? window.location.href : ''

  const isCustomizable = product.productType === 'Customizable'

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    setError(null)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      if (err instanceof Error) {
        console.error(err)
        setError({
          ...err,
          message: 'Could not add item to cart. Please try again.',
        })
      }
    }
  }

  return (
    <div className={className}>
      <h2 className="mt-6 mb-2 font-black text-4xl">{product.name}</h2>
      <ProductTypePill productType={product.productType} />
      <Text
        className="my-8 break-words w-full max-w-xl line-clamp-6"
        html={product.descriptionHtml || product.description}
      />
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      {isCustomizable ? (
        <DynamicSelectEnsName
          error={error}
          onSuccess={addToCart}
          variant={variant}
          loading={loading}
        />
      ) : (
        <div>
          {error && <ErrorMessage error={error} className="my-5" />}
          <button
            aria-label="Add to Cart"
            type="button"
            className="w-full flex items-center justify-center font-bold py-4 rounded-lg text-white bg-blue-primary"
            onClick={addToCart}
            disabled={variant?.availableForSale === false || loading}
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
            {loading && (
              <i className="pl-2 m-0 flex">
                <LoadingDots />
              </i>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductSectionSidebar
