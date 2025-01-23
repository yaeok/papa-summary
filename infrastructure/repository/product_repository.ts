import { Product } from '@/domains/Product'

import { FirestoreProductService } from '../service/firebase/firestore/firestore_product_service'

export class ProductRepository {
  private service: FirestoreProductService

  constructor() {
    this.service = new FirestoreProductService()
  }

  async findAll(args: { ownerId: string }): Promise<Product[]> {
    const { ownerId } = args

    const result = await this.service.findAll({ ownerId })

    const response = result.map((product) => {
      return new Product({
        id: product.id,
        name: product.name,
        price: product.price,
        content: product.content,
        categories: [],
        createdAt: product.createdAt,
      })
    })

    return response
  }

  async create(args: {
    name: string
    price: number
    content: string
    ownerId: string
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
