import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Discord, Twitter, Medium, GM } from '@components/icons'
import { Logo } from '@components/ui'

const primaryLinks = [
  {
    name: 'Shipping',
    url: '/shipping',
  },
  {
    name: 'Refund and Returns',
    url: '/refund',
  },
  {
    name: 'Report an Issue',
    url: 'https://github.com/GeneralMagicio/ens-merch-shop/issues/new?assignees=&labels=template%3A+story&template=3.feature_request.yml',
  },
  {
    name: 'FAQ',
    url: '/faq',
  },
  {
    name: 'Contact',
    url: '/contact',
  },
]

const secondaryLinks = [
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Terms of use',
    url: '/terms-of-use',
  },
  {
    name: 'Privacy policy',
    url: '/privacy-policy',
  },
  {
    name: 'Cookies',
    url: '/cookies',
  },
]

const socialLinks = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/ensdomains',
    icon: <Twitter />,
  },
  {
    name: 'Discord',
    url: 'https://chat.ens.domains/',
    icon: <Discord />,
  },
  {
    name: 'Medium',
    url: 'https://medium.com/the-ethereum-name-service',
    icon: <Medium />,
  },
]

const Footer: FC = () => {
  return (
    <footer className="bg-blue-primary flex items-center lg:h-[348px]">
      <div className="px-12 grid grid-cols-1 lg:grid-cols-12">
        <div className="flex my-12 lg:mt-0 h-24 flex-col lg:h-44 justify-between col-span-1 lg:col-span-2">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex gap-x-5">
            {socialLinks.map(({ icon, name, url }) => (
              <Link
                className="transition duration-200 hover:scale-110 hover:opacity-60"
                href={url}
                key={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-y-6 lg:col-start-5">
          {primaryLinks.map(({ name, url }) => (
            <Link
              href={url}
              key={name}
              className={
                'font-medium font-lg text-white transition duration-200 hover:opacity-60'
              }
              target={url.includes('http') ? '_blank' : '_self'}
              rel={'noopener noreferrer'}
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="col-span-1 mt-10 lg:mt-0 flex flex-col gap-y-6 lg:col-start-8">
          {secondaryLinks.map(({ name, url }) => (
            <Link
              href={url}
              key={name}
              className={
                'font-medium font-lg text-white transition duration-200 hover:opacity-60'
              }
              target={url.includes('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="col-span-1 flex flex-col lg:col-start-12">
          <div className="flex gap-x-2 my-10 lg:mt-32 lg:mb-0 items-center">
            <p className="text-white font-medium text-base text-xs">Built by</p>
            <Link
              href={'https://www.generalmagic.io/'}
              className="transition duration-200 hover:scale-110 hover:opacity-60"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GM />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
