import { IconContext } from 'react-icons'
import { RiCloseCircleFill } from 'react-icons/ri'

import { Product } from '@/domains/entities/product'

import CompletedButton from './button/completed_button'
import DeleteButton from './button/delete_button'
import UpdateButton from './button/update_button'

type props = {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: props) {
  if (isOpen) {
    return (
      <div className='fixed inset-0 max-h-screen z-50'>
        <div className='fixed inset-0 bg-black opacity-50 filter grayscale' />
        <div className='h-screen flex items-center justify-center'>
          <div className='relative p-4 mx-2 bg-white flex flex-col gap-4 rounded-lg shadow-lg w-full md:w-1/4'>
            <div className='w-full flex flex-row justify-between items-center'>
              <h1 className='text-2xl text-start font-semibold text-black border-b-2 border-blue-500'>
                {product.getName()}
              </h1>
              <button onClick={onClose}>
                <IconContext.Provider value={{ size: '2em', color: 'black' }}>
                  <RiCloseCircleFill />
                </IconContext.Provider>
              </button>
            </div>
            <div className='px-2 w-full flex flex-col justify-between'>
              <p className='min-h-32'>{product.getContent()}</p>
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
              <p className='text-end'>{product.getPrice()}円</p>
            </div>
            <div className='flex flex-row justify-between gap-4'>
              <DeleteButton />
              <UpdateButton />
              <CompletedButton />
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
