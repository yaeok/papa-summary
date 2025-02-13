'use client'

import { useEffect, useState } from 'react'

import Loading from '@/components/Loading/Loading'
import { Product } from '@/domains/entities/product'
import { GetAllProductUseCase } from '@/usecase/GetAllProductUseCase/GetAllProductUseCase'

import AddProductButton from './_components/AddProduct/AddProductButton'
import { useProductContext } from './_hooks/ProductProvider'

const Page = () => {
  const productContext = useProductContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const usecase = new GetAllProductUseCase()
      const response = await usecase.execute()
      productContext.setProducts(response.products)
      setLoading(false)
    }
    fetch()
  }, [])
  return (
    <div className='space-y-4'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-lg'>かうものリスト</h1>
        <AddProductButton />
      </div>
      {(() => {
        if (loading) {
          return <Loading />
        } else {
          return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
              {productContext.products.map((product: Product) => (
                <div
                  key={product.id}
                  className='p-4 aspect-square bg-white rounded-lg shadow-md flex flex-col justify-between'
                >
                  <div className='space-y-2'>
                    <h2 className='text-lg font-semibold'>{product.name}</h2>
                    <p>{product.content}</p>
                  </div>
                  <div>
                    <div className='flex flex-wrap gap-2'>
                      {product.categories.map((category) => (
                        <span
                          key={category.id}
                          className='text-xs bg-gray-200 rounded-full px-2 py-1'
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <div className='w-full text-end'>{product.price}円</div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      })()}
    </div>
  )
}

export default Page
