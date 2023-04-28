import React, { FC } from 'react'
import Image from 'next/image'

interface HeroProps {
  className?: string
  headline: string
  description: string
}

const Hero: FC<HeroProps> = ({ headline, description }) => {
  return (
    <div className="bg-ens-linear h-[730px] border-b border-t border-accent-2">
      <div className="max-w-6xl px-6 relative flex h-full mx-auto">
        <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0 mt-44">
          <h2 className="font-bold text-5xl sm:text-8xl leading-[60px] sm:leading-[110px] text-white">
            {headline}
          </h2>
          <h3 className="mt-2 sm:mt-6 text-white font-medium text-xl">
            {description}
          </h3>
        </div>
        <div className="absolute hidden lg:block bottom-0 right-6">
          <Image
            priority
            alt="hero models"
            src="/assets/shirt-models.png"
            width={520}
            height={624}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
