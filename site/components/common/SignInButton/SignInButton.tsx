import cn from 'clsx'
import { ConnectButton } from '@rainbow-me/rainbowkit'

interface SignInButtonProps {
  variant?: 'default' | 'light'
}

const SignInButton = ({ variant = 'default' }: SignInButtonProps) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain
        if (!connected) {
          return (
            <button
              className={cn(
                'w-24 py-3 rounded-lg',
                variant === 'default' ? 'bg-blue-primary' : 'bg-blue-surface'
              )}
              onClick={openConnectModal}
            >
              <span
                className={cn(
                  'text-base font-bold',
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
            className="bg-blue-surface w-28 py-3 rounded-lg"
            onClick={openAccountModal}
          >
            <span className="text-blue-primary-dark text-base font-bold">
              {account.displayName}
            </span>
          </button>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default SignInButton
