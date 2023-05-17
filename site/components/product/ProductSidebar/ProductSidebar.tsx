import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast'
import type { Product } from '@commerce/types/product'
import { LoadingDots } from '@components/ui'
import { Text, Rating, useUI } from '@components/ui'
import { ProductOptions } from '@components/product'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ErrorMessage from '@components/ui/ErrorMessage'
import Link from '@components/ui/Link/Link'
import { ArrowLeftBold, Share } from '@components/icons'
import ProductTypePill from '@components/ui/ProductTypePill'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/Select'
import useENSNames from '@lib/hooks/useENSNames/useENSNames'
import { useAccount } from 'wagmi'
import SignInButton from '@components/common/SignInButton/SignInButton'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const [selectedEnsName, setSelectedEnsName] = useState<string>()

  const { address, isConnected } = useAccount()
  const { data: ensNames } = useENSNames({ address })

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
      <Toaster />
      <div className="flex mb-20 text-blue-primary text-sm font-medium items-center">
        <ArrowLeftBold className="mr-2" />
        <Link href="/search/products">All Products</Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center">
          <Rating value={3} />
          <span className="text-blue-primary ml-4 font-medium text-sm">
            36 reviews
          </span>
        </div>
        <CopyToClipboard
          text={url}
          onCopy={() =>
            toast('Product page copied to clipboard', { icon: '✂️' })
          }
        >
          <div className="flex items-center cursor-pointer">
            <span className="mr-1 text-sm font-medium text-blue-primary">
              Share this
            </span>
            <Share />
          </div>
        </CopyToClipboard>
      </div>
      <h2 className="mt-6 mb-2 font-black text-4xl">{product.name}</h2>
      <ProductTypePill productType={product.productType} />
      <Text
        className="pb-4 mt-6 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      />
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      {isCustomizable ? (
        <>
          <div className="w-full mt-2 mb-8 border">
            {isConnected ? (
              ensNames && ensNames?.domains.length > 0 ? (
                <Select
                  value={selectedEnsName}
                  onValueChange={setSelectedEnsName}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your ENS name" />
                  </SelectTrigger>
                  <SelectContent className="bg-blue-surface overflow-y-scroll max-h-[300px]">
                    {ensNames?.domains.map(({ id, name }) => (
                      <SelectItem
                        className="hover:bg-black m-0 hover:bg-opacity-10"
                        key={id}
                        value={name.toLowerCase()}
                      >
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="w-full p-3 rounded-lg bg-blue-surface">
                  The connected address doesn't own any ENS name
                </span>
              )
            ) : (
              <SignInButton />
            )}
          </div>
          <div>
            {error && <ErrorMessage error={error} className="my-5" />}
            <button
              aria-label="Add to Cart"
              type="button"
              className="w-full flex items-center justify-center font-bold py-4 rounded-lg text-white bg-blue-primary disabled:opacity-70"
              onClick={addToCart}
              disabled={
                variant?.availableForSale === false ||
                loading ||
                !selectedEnsName
              }
            >
              {variant?.availableForSale === false
                ? 'Not Available'
                : 'Add To Cart (custom)'}
              {loading && (
                <i className="pl-2 m-0 flex">
                  <LoadingDots />
                </i>
              )}
            </button>
          </div>
        </>
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

export default ProductSidebar
