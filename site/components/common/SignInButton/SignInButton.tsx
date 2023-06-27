import cn from 'clsx'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useSwitchNetwork } from 'wagmi'

interface SignInButtonProps {
  className?: string
  variant?: 'default' | 'light'
}

const SignInButton = ({
  className,
  variant = 'default',
}: SignInButtonProps) => {
  const { chains, switchNetworkAsync } = useSwitchNetwork()

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain
        if (!connected) {
          return (
            <button
              className={cn(
                'w-24 py-3 rounded-lg',
                variant === 'default' ? 'bg-blue-primary' : 'bg-blue-surface',
                className
              )}
              onClick={openConnectModal}
            >
              <span
                className={cn(
                  'text-white font-bold',
                  variant === 'default'
                    ? 'text-white'
                    : 'text-blue-primary-dark'
                )}
              >
                Sign in
              </span>
            </button>
          )
        }
        return (
          <button
            className="bg-blue-surface min-w-[120px] px-2 py-3 rounded-lg"
            onClick={async () => {
              if (chains[0]?.id !== chain?.id) {
                await switchNetworkAsync?.(chains[0]?.id)
              }
              openAccountModal && openAccountModal()
            }}
          >
            <span className="text-blue-primary-dark font-bold">
              {account.displayName}
            </span>
          </button>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default SignInButton
