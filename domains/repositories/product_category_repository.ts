import { ProductCategoryDB } from '@/infrastructure/data/product_category'

export interface ProductCategoryRepository {
  create(args: { productCategory: ProductCategoryDB }): Promise<void>
  findByProductId(args: { productId: string }): Promise<ProductCategoryDB[]>
}
