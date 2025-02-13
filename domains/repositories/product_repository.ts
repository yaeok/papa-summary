import { Product } from '@/domains/entities/product'
import { ProductDB } from '@/infrastructure/data/product'

export interface ProductRepository {
  findAll(args: { createdBy: string }): Promise<ProductDB[]>
  create(args: { product: Product }): Promise<ProductDB>
}
