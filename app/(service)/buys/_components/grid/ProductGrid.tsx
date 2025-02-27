'use client'

import Loading from '@/components/Loading/Loading'
import { Product } from '@/domains/entities/product'

import { useProductListPageContext } from '../../_hooks/ProductListPageProvider'
import ProductGridItem from './grid_item/ProductGridItem'

export default function ProductGrid() {
  const productListPageContext = useProductListPageContext()

  if (productListPageContext.loading) {
    return <Loading />
  } else {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {productListPageContext.products.map((product: Product) => (
          <ProductGridItem key={product.getId()} product={product} />
        ))}
      </div>
    )
  }
}
