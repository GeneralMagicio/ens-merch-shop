import { useAccount } from 'wagmi'
import { useMemo, useState } from 'react'
import ErrorMessage from '@components/ui/ErrorMessage'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/Select'
import SignInButton from '@components/common/SignInButton/SignInButton'
import useENSNames from '@lib/hooks/useENSNames/useENSNames'
import useSiwe from '@lib/hooks/useSiwe'
import { LoadingDots } from '@components/ui'

interface SelectEnsNameProps {
  error: Error | null
  loading: boolean
  onSuccess: () => void
  variant: any
}

const SelectEnsName = ({
  error,
  loading,
  onSuccess,
  variant,
}: SelectEnsNameProps) => {
  const [selectedEnsName, setSelectedEnsName] = useState<string>()

  const { address, isConnected } = useAccount()
  const { data: ensNamesData } = useENSNames({ address })

  const { signIn } = useSiwe({
    onSuccess,
  })

  // Filter only ens names with less than 13 characters
  const filteredENSNames = useMemo(
    () => ensNamesData?.domains.filter((ensName) => ensName.name.length <= 20),
    [ensNamesData]
  )
  return (
    <div className="w-full mt-2 mb-8">
      {isConnected ? (
        <>
          {filteredENSNames && filteredENSNames.length > 0 ? (
            <>
              <h2 className="mb-3 font-bold text-lg tracking-wide">ENS Name</h2>
              <Select
                value={selectedEnsName}
                onValueChange={setSelectedEnsName}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your ENS name" />
                </SelectTrigger>
                <SelectContent className="bg-blue-surface overflow-y-scroll max-h-[300px] max-w-xl mx-4">
                  {filteredENSNames.map(({ id, name }) => (
                    <SelectItem
                      className="hover:bg-blue-primary hover:font-medium hover:text-white hover:text-opacity-100"
                      key={id}
                      value={name.toLowerCase()}
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          ) : (
            <div className="flex flex-col my-5 gap-y-2 py-4 px-6 rounded-lg font-medium items-center w-full bg-blue-surface border border-blue-primary">
              The connected address doesn't own any ENS name
            </div>
          )}
          <div>
            {error && <ErrorMessage error={error} className="my-5" />}
            <button
              aria-label="Add to Cart"
              type="button"
              className="w-full mt-8 flex items-center justify-center font-bold py-4 rounded-lg text-white bg-blue-primary disabled:opacity-70"
              onClick={() => {
                signIn()
              }}
              disabled={
                variant?.availableForSale === false ||
                loading ||
                !selectedEnsName
              }
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
        </>
      ) : (
        <SignInButton className="min-w-full" />
      )}
    </div>
  )
}

export default SelectEnsName
