import { FC } from 'react'
import Link from 'next/link'
import cn from 'clsx'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import useScroll from '@lib/hooks/useScroll'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
  isHomePage?: boolean
}

const Navbar: FC<NavbarProps> = ({ links, isHomePage }) => {
  const scrolled = useScroll(700)
  const variant = !isHomePage || scrolled ? 'default' : 'light'
  return (
    <Container
      clean
      className="w-full inset-0 fixed z-20 max-h-fit backdrop-blur-xl border-gray-200 mx-auto max-w-8xl px-12"
    >
      <div className="flex items-center justify-between h-24">
        <Link href="/" aria-label="Logo">
          <Logo variant={variant} />
        </Link>
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar variant={variant} />
          </div>
        )}
        <div className="flex items-center justify-between">
          <nav
            className={cn(
              'flex justify-center font-bold mx-8 text-lg w-[300px] items-center gap-x-6 flex-1',
              variant === 'default' ? 'text-blue-primary' : 'text-blue-surface'
            )}
          >
            {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-end flex-1 space-x-8">
            <UserNav variant={variant} />
          </div>
        </div>
      </div>
      {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar variant={variant} id="mobile-search" />
        </div>
      )}
    </Container>
  )
}

export default Navbar
