import { Layout } from '@components/common'
import Newsletter from '@components/common/Newsletter'
import { Accordion } from '@components/ui/Accordion/Accordion'

export default function Home() {
  return (
    <>
      <div className="max-w-3xl px-4 my-44 mx-auto">
        <h2 className="text-5xl text-center font-bold">
          Frequently asked questions
        </h2>
        <div className="mt-14">
          <Accordion items={items} />
        </div>
      </div>
      <Newsletter />
    </>
  )
}

Home.Layout = Layout

const items = [
  {
    title: 'Why is my name not listed?',
    description:
      "When selecting customized merch, make sure the owner wallet is connected. If you've connected the manager wallet, or the token is not owned by the wallet, the name will not populate.",
  },
  {
    title: 'Why do I need to sign a message with my wallet?',
    description:
      'Signing with your wallet ensure that you have ownership and control the name. Message signing is always gasless and no transaction should occur.',
  },
  {
    title: "Why can't names with non-ASCII letters be ordered?",
    description:
      'Due to constraints in the printing and embroidery process, non-ASCII names are currently unable to be included on customized merch.',
  },
  {
    title: "Why can't names longer than 18 characters be ordered?",
    description:
      'Names longer than 18 characters, including the ".eth," are not able to be customized.This restriction helps prevent substandard reproduction of longer names that may not fit in the printable area.',
  },
  {
    title: 'Who should I contact if I have a question, concern or complaint?',
    description:
      'The store is operated by General Magic and all questions, concerns and complaints (including quality issues) can be directed towards them from the [contact page.](/contact-us)',
  },
  {
    title: 'Crypto Payments',
    description:
      'The store allows for payment in Fiat or in Crypto through Coinbase Commerce paying in BTC, Litecoin  and ETH, USDC, USDT, or DAI on Ethereum Mainnet and ETH, MATIC and USDC on Polygon. ',
  },
]
