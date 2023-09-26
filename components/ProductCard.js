import Link from 'next/link'
import Image from 'next/image'
import { formatter } from '../utils/helpers'

export const ProductCard = ({ product }) => {
  const { handle, title, images } = product.node
  const { url, altText } = images.edges[0].node
  const price = product.node.priceRange.minVariantPrice.amount

  return (
    <Link
      href={`products/${handle}`}
    >
      <div className='group'>
        <div className='w-full bg-gray-200 rounded-3xl overflow-hidden'>
          <div className='relative group-hover:opactiy-75 h-72'>
            <Image
              src={url}
              alt={altText}
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
        <h3 className='mt-3 text-lg font-medium text-gray-900'>
          {title}
        </h3>
        <p className='mt-1 text-sm text-gray-700'>{formatter.format(price)}</p>
      </div>
    </Link>
  )
}

export default ProductCard