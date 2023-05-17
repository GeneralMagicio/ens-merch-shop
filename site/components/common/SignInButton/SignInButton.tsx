import cn from 'clsx'
import { ConnectButton } from '@rainbow-me/rainbowkit'

interface SignInButtonProps {
  className?: string
  variant?: 'default' | 'light'
}

const SignInButton = ({
  className,
  variant = 'default',
}: SignInButtonProps) => {
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
            className="bg-blue-surface min-w-[120px] px-2 py-3 rounded-lg"
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
