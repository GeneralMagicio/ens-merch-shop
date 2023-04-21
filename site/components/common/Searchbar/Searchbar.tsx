import { FC, memo, useEffect } from 'react'
import { MagnifyingGlass } from '@components/icons'
import { useRouter } from 'next/router'

interface Props {
  className?: string
  id?: string
}

const Searchbar: FC<Props> = ({ className, id = 'search' }) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [router])

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.key === 'Enter') {
      const q = e.currentTarget.value

      router.push(
        {
          pathname: `/search`,
          query: q ? { q } : {},
        },
        undefined,
        { shallow: true }
      )
    }
  }

  return (
    <div className="relative flex items-center">
      <label className="hidden" htmlFor={id}>
        Search
      </label>
      <input
        id={id}
        className="font-medium text-base pl-10 w-[400px] rounded-lg border border-blue-light p-3 text-blue-light bg-transparent "
        placeholder="Search for products..."
        defaultValue={router.query.q}
        onKeyUp={handleKeyUp}
      />
      <div className="absolute left-4">
        <MagnifyingGlass />
      </div>
    </div>
  )
}

export default memo(Searchbar)
