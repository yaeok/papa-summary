export class FirestoreProductCategoryService {
  async create(args: { name: string }): Promise<void> {
    console.log('FirestoreProductCategoryService.create', args)
  }
}
