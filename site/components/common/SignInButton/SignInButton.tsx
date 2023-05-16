import { ConnectButton } from '@rainbow-me/rainbowkit'

const SignInButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain
        if (!connected) {
          return (
            <button
              className="bg-blue-primary w-24 py-3 rounded-lg"
              onClick={openConnectModal}
            >
              <span className="text-white text-base font-bold">Sign in</span>
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
