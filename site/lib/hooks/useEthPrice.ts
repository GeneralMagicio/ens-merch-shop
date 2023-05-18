import { useQuery } from 'wagmi'

interface EthPrice {
  ethereum: {
    usd: number
  }
}

export const useEthPrice = () => {
  const queryResponse = useQuery<EthPrice>(['ethPrice'], {
    cacheTime: 1000 * 60 * 60, // 1 hour
    queryFn: async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      )
      const data = await response.json()
      return data
    },
  })
  return queryResponse
}
