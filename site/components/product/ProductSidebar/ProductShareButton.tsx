import { Share } from '@components/icons'
import { useUI } from '@components/ui'

const ProductShareButton = () => {
  const { setModalView, openModal } = useUI()
  return (
    <>
      <div onClick={() => {
        setModalView('SHARE_PRODUCT_VIEW')
        openModal()
      }} className="flex items-center cursor-pointer">
        <span className="mr-1">Share this</span>
        <Share />
      </div>
    </>
  )
}

export default ProductShareButton
