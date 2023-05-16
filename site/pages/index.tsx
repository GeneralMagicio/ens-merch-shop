import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import Newsletter from '@components/common/Newsletter'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  const selectedProducts = products.sort(() => 0.5 - Math.random()).slice(0, 2)

  return {
    props: {
      products: selectedProducts,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Hero
        headline="Get your official ENS Merch!"
        description="Show your love for decentralized naming"
      />
      <section className="w-full py-24 bg-blue-surface">
        <div className="text-center px-4">
          <h3 className="font-bold text-5xl">
            Discover the latest high quality ENS merch
          </h3>
          <h5 className="mt-3 font-medium text-xl">
            Look good and feel good knowing you support decentralized naming
          </h5>
        </div>
        <div className="flex mt-24 items-center gap-x-44 justify-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="max-w-fit"
              variant="floating"
              imgProps={{
                alt: product.name,
                width: 400,
                height: 400,
              }}
            />
          ))}
        </div>
      </section>
      <Newsletter />
    </>
  )
}

Home.Layout = Layout
