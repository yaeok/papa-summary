import { Product } from '@/domains/Product'

import { FirestoreProductService } from '../service/firebase/firestore/firestore_product_service'

export class ProductRepository {
  private service: FirestoreProductService

  constructor() {
    this.service = new FirestoreProductService()
  }

  async create(args: {
    name: string
    price: number
    content: string
  }): Promise<Product> {
    const result = await this.service.create(args)

    const response = new Product({
      id: result.id,
      name: result.name,
      price: result.price,
      content: result.content,
      categories: [],
      createdAt: result.createdAt,
    })

    return response
  }
}
