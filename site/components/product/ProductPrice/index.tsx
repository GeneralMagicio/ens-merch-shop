
interface ProductPriceProps {
    price: number
}

const ProductPrice = ({ price }: ProductPriceProps) => {
  return (
    <div className='mb-8'>
      <h2 className="capitalize font-bold text-lg tracking-wide">Price</h2>
      <div>${price}</div>
    </div>
    );
}

export default ProductPrice
