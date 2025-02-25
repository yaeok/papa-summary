'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { Category } from '@/domains/entities/category'
import { Product } from '@/domains/entities/product'
import { GetAllCategoryUseCase } from '@/usecase/get_all_category_usecase/get_all_category_usecase'
import { GetAllProductUseCase } from '@/usecase/get_all_product_usecase/get_all_product_usecase'

type ProductContextType = {
  loading: boolean
  products: Product[]
  categories: Category[]
  addProduct: (product: Product) => void
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const ProductContext = createContext<ProductContextType>({
  loading: false,
  products: [],
  categories: [],
  addProduct: () => {},
  setProducts: () => {},
})

export const useProductContext = () => useContext(ProductContext)

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategory = async () => {
      const usecase = new GetAllCategoryUseCase()
      const { response } = await usecase.execute()
      setCategories(response)
    }

    const fetchProduct = async () => {
      const usecase = new GetAllProductUseCase()
      const { response } = await usecase.execute()
      setProducts(response)
    }

    const fetch = async () => {
      setLoading(true)
      await Promise.all([fetchCategory(), fetchProduct()])
      setLoading(false)
    }
    fetch()
  }, [])

  const addProduct = (product: Product) => {
    setProducts([...products, product])
  }

  return (
    <ProductContext.Provider
      value={{ loading, products, categories, addProduct, setProducts }}
    >
      {children}
    </ProductContext.Provider>
  )
}
