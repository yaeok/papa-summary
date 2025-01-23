'use client'

import { createContext, useContext, useState } from 'react'

import { Product } from '@/domains/Product'

type ProductContextType = {
  products: Product[]
  addProduct: (product: Product) => void
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  setProducts: () => {},
})

export const useProductContext = () => useContext(ProductContext)

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [products, setProducts] = useState<Product[]>([])

  const addProduct = (product: Product) => {
    setProducts([...products, product])
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, setProducts }}>
      {children}
    </ProductContext.Provider>
  )
}
