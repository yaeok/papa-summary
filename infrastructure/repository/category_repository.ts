import { FirestoreCategoryService } from '../service/firebase/firestore/firestore_category_service'

export class CategoryRepository {
  private service: FirestoreCategoryService

  constructor() {
    this.service = new FirestoreCategoryService()
  }

  async create(args: { name: string }): Promise<void> {
    await this.service.create(args)
  }
}
