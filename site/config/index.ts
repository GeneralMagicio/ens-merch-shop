import { mainnet, goerli } from '@wagmi/chains'

export const SITE_NAME = 'ENS Merch Shop'
export const SITE_DESCRIPTION =
  'Shop exclusive ENS merchandise at the official Ethereum Name Service Swag Store. Show your support for the decentralized naming system revolutionizing the Ethereum ecosystem.'
export const SITE_URL = 'https://ens-merch-shop.vercel.app/'
export const MAIN_SITE_URL = 'https://ens.domains/'

export const SOCIAL_DISCORD = 'https://chat.ens.domains/'
export const SOCIAL_TWITTER = 'ensdomains'
export const SOCIAL_GITHUB = 'ensdomains'
export const SOCIAL_MEDIUM = 'the-ethereum-name-service'

export const WEB3_CHAINS = [mainnet, goerli]

export const SOCIALS = [
  {
    name: 'Twitter',
    path: `https://twitter.com/${SOCIAL_TWITTER}`,
  },
  {
    name: 'Discord',
    path: `https://discord.gg/${SOCIAL_DISCORD}`,
  },
  {
    name: 'GitHub',
    path: `https://github.com/${SOCIAL_GITHUB}`,
  },
  {
    name: 'Medium',
    path: `https://medium.com/${SOCIAL_MEDIUM}`,
  },
] as const

export const IRON_SESSION_CONFIG = {
  cookieName: `siwe ${SITE_NAME}`,
  password:
    process.env.IRON_SESSION_PASSWORD ??
    // UPDATE fallback password
    'complex_password_at_least_32_characters_long',
  cookieOptions: {
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: process.env.NODE_ENV === 'production',
  },
}
