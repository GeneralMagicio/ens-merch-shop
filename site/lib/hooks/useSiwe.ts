import { useState, useEffect } from 'react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'

interface UseSiweProps {
  onSuccess: () => void
}

const useSiwe = ({ onSuccess }: UseSiweProps) => {
  const [state, setState] = useState<{
    loading?: boolean
    nonce?: string
  }>({})
  const { address } = useAccount()

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch('/api/siwe/nonce')
      const nonce = await nonceRes.text()
      setState((x) => ({ ...x, nonce }))
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error }))
    }
  }

  useEffect(() => {
    fetchNonce()
  }, [])

  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  const signIn = async () => {
    try {
      const chainId = chain?.id
      if (!address || !chainId) return

      setState((x) => ({ ...x, loading: true }))
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: state.nonce,
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      // Verify signature
      const verifyRes = await fetch('/api/siwe/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })
      if (!verifyRes.ok) throw new Error('Error verifying message')

      setState((x) => ({ ...x, loading: false }))
      onSuccess()
    } catch (error) {
      setState((x) => ({ ...x, loading: false, nonce: undefined }))
      fetchNonce()
    }
  }

  return {
    signIn,
    loading: state.loading,
  }
}

export default useSiwe
