import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import Newsletter from '@components/common/Newsletter'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'

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

  return {
    props: {
      products,
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
      <div className="max-w-3xl mt-20 mb-44 mx-auto">
        <h2 className="text-5xl text-center font-bold">About</h2>
        <p className="mt-14 text-2xl font-bold leading-8">
          ENS Merch Shop sells official merchandise of{' '}
          <Link
            href={'https://ens.domains/'}
            className="text-blue-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ethereum Name Service (ENS)
          </Link>{' '}
          which is a distributed, open, and extensible naming system based on
          the Ethereum blockchain.
        </p>
        <p className="text-xl font-medium my-8 leading-7">
          The shop was built and is maintained by{' '}
          <Link
            href={'https://www.generalmagic.io/'}
            className="text-blue-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            General Magic
          </Link>{' '}
          on behalf of ENS DAO. Funding for the shop was part of{' '}
          <Link
            href={
              'https://docs.ens.domains/v/governance/governance-proposals/term-2/ep16.2-executable-q3-and-q4-2022-ens-ecosystem-wg-budget'
            }
            className="text-blue-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Q3 & Q4 2022 Ecosystem WG Budget.
          </Link>
        </p>
        <p className="text-xl font-medium leading-7">
          <Link
            href={'https://www.generalmagic.io/'}
            className="text-blue-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            General Magic
          </Link>{' '}
          is a group of Web3 professionals with deep roots in the Ethereum
          ecosystem devoted to supporting commons-based organizations and public
          good projects. Our core business is providing solution services for
          impact DAOs. We sell high-quality merch for ENS domains owners.
        </p>
      </div>
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
          {products.slice(2).map((product) => (
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
