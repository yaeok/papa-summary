import { useState } from 'react'

import { Product } from '@/domains/entities/product'

import ProductModal from './item/ProductModal'

type props = {
  key: string
  product: Product
}

export default function ProductGridItem({ key, product }: props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  return (
    <>
      <div
        key={key}
        onClick={handleOpen}
        className='p-4 aspect-square bg-white rounded-lg shadow-md flex flex-col justify-between cursor-pointer'
      >
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold'>{product.getName()}</h2>
          <p className='text-sm px-2 text-gray-500'>{product.getContent()}</p>
        </div>
        <div>
          <div className='flex flex-wrap gap-2'>
            {product.getCategories().map((category) => (
              <span
                key={category.getId()}
                className='text-xs bg-gray-200 rounded-full px-2 py-1'
              >
                {category.getName()}
              </span>
            ))}
          </div>
          <div className='w-full text-end'>{product.getPrice()}円</div>
        </div>
      </div>
      <ProductModal product={product} isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
