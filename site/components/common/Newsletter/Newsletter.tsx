import Image from 'next/image'
import { useState, FormEventHandler, FormEvent } from 'react'
import { Eth, InfoStyled } from '@components/icons'
import { FC } from 'react'
import { Input } from '@components/ui'

const Newsletter: FC = () => {
  const [sent, setSent] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="bg-blue-surface overflow-hidden min-h-[500px] flex items-center justify-between lg:h-[512px]">
      <div className="relative mx-auto text-center xl:text-left xl:ml-20 2xl:ml-60 z-10">
        <h3 className="font-semibold text-4xl sm:text-6xl">Stay in the loop</h3>
        <p className="font-medium text-zinc-700 text-xl mt-3 mb-8">
          Get first dibs on the latest ENS merchdrops
        </p>
        {sent ? (
          <div className="flex flex-col gap-y-2 py-3 px-6 rounded-lg items-center w-full bg-blue-surface border border-blue-primary">
            <InfoStyled />
            <p className="text-base font-medium">
              You have successfully subscribed!
            </p>
          </div>
        ) : (
          <form
            className="flex flex-col sm:flex-row items-center gap-4"
            onSubmit={handleSubmit}
          >
            <div className="w-[270px]">
              <Input
                type="text"
                required
                placeholder="Your email address"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              />
            </div>
            <button
              type="submit"
              className="py-4 rounded-lg w-[270px] sm:w-[180px] bg-blue-primary font-bold text-white"
            >
              Get notified
            </button>
          </form>
        )}
      </div>
      <div className="min-h-full hidden xl:block w-1/2 relative">
        <Eth className="absolute -top-6 right-60" />
        <Eth className="absolute top-2 translate-y-1/2 -rotate-90 right-16 translate-x-1/2 " />
        <Image
          quality={100}
          className="absolute -bottom-20 right-24"
          alt="ENS shirts"
          height={445}
          width={574}
          src="/assets/newsletter-image.png"
        />
      </div>
    </section>
  )
}

export default Newsletter
