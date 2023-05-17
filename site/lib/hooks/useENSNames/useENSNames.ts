import { useQuery } from 'wagmi'
import { request } from 'graphql-request'
import { queryDomains } from './query'
import { ENSDomainsQueryResponse } from './types'

interface UseENSNamesProps {
  address: `0x${string}` | undefined
}

export const useENSNames = ({ address }: UseENSNamesProps) => {
  const { data } = useQuery<ENSDomainsQueryResponse>(
    ['queryDomains', address],
    {
      queryFn: async () =>
        request(
          'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
          queryDomains,
          { owner: address?.toLowerCase() }
        ),
      enabled: !!address,
    }
  )

  return data
}

export default useENSNames
