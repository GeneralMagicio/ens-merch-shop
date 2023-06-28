import { FC, useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import { Twitter } from '@components/icons'
import Linkedin from '@components/icons/Linkedin'
import Facebook from '@components/icons/Facebook'

const ProductShareModal: FC = () => {
  const shareTitle = 'Check out this product on ENS Merch Shop!'
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const [isCopied, setIsCopied] = useState(false);

  if (typeof window === 'undefined') {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 5000);
  };

  return (
    <div className="text-center md:p-6">
      <h3 className="text-2xl text-black mb-8 font-bold">
        Share this with your friends!
      </h3>
      <div className="flex items-center justify-center gap-4">
          <TwitterShareButton
            hashtags={['ENS', 'merch_shop']}
            title={shareTitle}
            url={url}
          >
            <Twitter color='#1DA1F2' size={70} />
          </TwitterShareButton>
          <LinkedinShareButton
            title={shareTitle}
            url={url}
          >
            <Linkedin />
          </LinkedinShareButton>
          <FacebookShareButton
            hashtag='#ens_merch_shop'
            quote={shareTitle}
            url={url}
          >
            <Facebook />
          </FacebookShareButton>
      </div>
      <p className="mt-4 mb-4 text-black text-md font-bold">
        Or copy the link
      </p>
      <div onClick={() => !isCopied && handleCopy()} className="flex flex-col md:flex-row py-2 justify-center items-center border border-dashed border-gray-400 rounded-lg mt-5 mx-auto shadow-lg cursor-pointer">
        <div className="text-sm max-w-full px-6 text-gray-500 break-words">
          {url}
        </div>
        <div className="border-l border-gray-400 h-4 hidden md:block" />
        <div className="border-b border-gray-400 w-full my-2 md:hidden" />
        <button
          className='text-sm uppercase font-bold m-auto w-28 flex-shrink-0 flex-grow-0 text-pink-light'
        >
          {
            isCopied
              ? 'Copied'
              : 'Copy Link'
          }
        </button>
      </div>
    </div>
  )
}

export default ProductShareModal
