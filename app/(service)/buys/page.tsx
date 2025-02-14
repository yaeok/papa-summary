'use client'

import { useEffect, useState } from 'react'

import Loading from '@/components/Loading/Loading'
import { Product } from '@/domains/entities/product'
import { GetAllProductUseCase } from '@/usecase/get_all_product_usecase/get_all_product_usecase'

import AddProductButton from './_components/add_product/AddProductButton'
import { useProductContext } from './_hooks/ProductProvider'

const Page = () => {
  const productContext = useProductContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const usecase = new GetAllProductUseCase()
      const { response } = await usecase.execute()
      productContext.setProducts(response)
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
                  key={product.getId()}
                  className='p-4 aspect-square bg-white rounded-lg shadow-md flex flex-col justify-between'
                >
                  <div className='space-y-2'>
                    <h2 className='text-lg font-semibold'>
                      {product.getName()}
                    </h2>
                    <p>{product.getContent()}</p>
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
                    <div className='w-full text-end'>
                      {product.getPrice()}円
                    </div>
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
