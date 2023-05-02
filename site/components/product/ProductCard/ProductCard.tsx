import { FC } from 'react'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'

import { EnsLogo } from '@components/icons'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple' | 'floating'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  if (variant === 'floating')
    return (
      <div className="relative bg-blue-primary w-[560px] rounded-3xl p-9">
        <EnsLogo />
        <div className="mt-12 text-white max-w-[270px]">
          <h3 className="font-black text-4xl leading-[48px]">{product.name}</h3>
          <p className="mt-4 font-medium text-lg line-clamp-3">
            {product.description}
          </p>
        </div>
        <Link
          className="inline-block bg-white mt-4 py-3 px-8 rounded-lg text-blue-primary font-bold text-base"
          href={`/product/${product.slug}`}
          aria-label={product.name}
        >
          Add to cart
        </Link>
        {product?.images && (
          <Image
            className="absolute -top-6 right-0 translate-x-1/3"
            alt={product.name || 'Product Image'}
            src={product.images[0]?.url || placeholderImg}
            height={320}
            width={320}
            quality="85"
            {...imgProps}
          />
        )}
      </div>
    )

  return (
    <Link href={`/product/${product.slug}`} aria-label={product.name}>
      {variant === 'simple' && (
        <>
          <div className="p-2 hover:shadow-lg hover:bg-neutral-100 overflow-hidden transition duration-300 rounded-2xl ">
            {product?.images && (
              <Image
                alt={product.name || 'Product Image'}
                src={product.images[0]?.url || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
          {!noNameTag && (
            <div className="flex flex-col mt-5 items-center gap-y-2">
              <h3 className="font-semibold text-xl">{product.name}</h3>
              {product?.productType && (
                <div className="bg-blue-surface text-blue-primary font-bold text-sm py-1 px-2 rounded-full">
                  {product.productType}
                </div>
              )}
              <div className="font-semibold text-xl">{`${price} ${product.price?.currencyCode}`}</div>
            </div>
          )}
        </>
      )}

      {variant === 'slim' && (
        <>
          <div>
            <span>{product.name}</span>
          </div>
          {product?.images && (
            <Image
              quality="85"
              src={product.images[0]?.url || placeholderImg}
              alt={product.name || 'Product Image'}
              height={320}
              width={320}
              {...imgProps}
            />
          )}
        </>
      )}
      {variant === 'default' && (
        <>
          {process.env.COMMERCE_WISHLIST_ENABLED && (
            <WishlistButton
              productId={product.id}
              variant={product.variants[0] as any}
            />
          )}
          <ProductTag
            name={product.name}
            price={`${price} ${product.price?.currencyCode}`}
          />
          <div>
            {product?.images && (
              <Image
                alt={product.name || 'Product Image'}
                src={product.images[0]?.url || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}
    </Link>
  )
}

export default ProductCard
