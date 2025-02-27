'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { Product } from '@/domains/entities/product'
import { InitialDisplayProductListPageUseCase } from '@/usecase/initial_display_product_list_page_usecase'

type ProductListPageContextType = {
  loading: boolean
  products: Product[]
  addProduct: (product: Product) => void
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const ProductListPageContext = createContext<ProductListPageContextType>({
  loading: false,
  products: [],
  addProduct: () => {},
  setProducts: () => {},
})

export const useProductListPageContext = () =>
  useContext(ProductListPageContext)

export const ProductListPageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      const usecase = new InitialDisplayProductListPageUseCase()
      const { response } = await usecase.execute()
      setProducts(response)
    }

    const fetch = async () => {
      setLoading(true)
      await Promise.all([fetchProduct()])
      setLoading(false)
    }
    fetch()
  }, [])

  const addProduct = (product: Product) => {
    setProducts([...products, product])
  }

  return (
    <ProductListPageContext.Provider
      value={{ loading, products, addProduct, setProducts }}
    >
      {children}
    </ProductListPageContext.Provider>
  )
}
