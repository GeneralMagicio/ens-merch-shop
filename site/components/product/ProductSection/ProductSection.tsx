import cn from 'clsx'
import Image from 'next/image'
import s from './ProductSection.module.css'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import { ProductSlider } from '@components/product'
import { Container } from '@components/ui'
import ProductSectionSidebar from '../ProductSectionSidebar'

interface ProductSectionProps {
  product: Product | undefined
}

const ProductSection: FC<ProductSectionProps> = ({ product }) => {
  if (!product) return null

  return (
    <Container
      className="grid grid-cols-1 px-4 md:grid-cols-2 gap-x-8 w-full max-w-7xl my-10 mx-auto"
      clean
    >
      <div className="col-span-1 flex items-center justify-center">
        <Image
          className={s.img}
          src={product.images[0].url!}
          alt={product.images[0].alt || 'Product Image'}
          width={450}
          height={450}
          priority={true}
          quality="85"
        />
      </div>
      <div className="col-span-1">
        <ProductSectionSidebar
          key={product.id}
          product={product}
          className={s.sidebar}
        />
      </div>
    </Container>
  )
}

export default ProductSection
