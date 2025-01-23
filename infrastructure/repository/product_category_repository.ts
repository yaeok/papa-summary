import { FirestoreProductCategoryService } from '../service/firebase/firestore/firestore_product_category_service'

export class ProductCategoryRepository {
  private service: FirestoreProductCategoryService

  constructor() {
    this.service = new FirestoreProductCategoryService()
  }

  async create(args: { name: string }): Promise<void> {
    await this.service.create(args)
  }
}
