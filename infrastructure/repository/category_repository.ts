import { Category } from '@/domains/Category'

import { FirestoreCategoryService } from '../service/firebase/firestore/firestore_category_service'

export class CategoryRepository {
  private service: FirestoreCategoryService

  constructor() {
    this.service = new FirestoreCategoryService()
  }

  async create(args: { name: string; userId: string }): Promise<string> {
    const response = await this.service.create(args)

    return response
  }

  async findByUserId(args: { userId: string }): Promise<Category[]> {
    const response = await this.service.findByUserId(args)

    const categories = response.map((category) =>
      Category.fromCategoryDTO(category)
    )

    return categories
  }
}
