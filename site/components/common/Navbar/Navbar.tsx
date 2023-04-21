import { FC } from 'react'
import Link from 'next/link'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <Container clean className="mx-auto max-w-8xl px-12">
    <div className="flex items-center justify-between h-36">
      <Link href="/" aria-label="Logo">
        <Logo />
      </Link>
      {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className="justify-center flex-1 hidden lg:flex">
          <Searchbar />
        </div>
      )}
      <div className="flex  items-center justify-between">
        <nav className="flex justify-between font-bold mx-8 text-lg text-white w-[300px] items-center gap-4 flex-1">
          {links?.map((l) => (
            <Link href={l.href} key={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>
    </div>
    {process.env.COMMERCE_SEARCH_ENABLED && (
      <div className="flex pb-4 lg:px-6 lg:hidden">
        <Searchbar id="mobile-search" />
      </div>
    )}
  </Container>
)

export default Navbar
