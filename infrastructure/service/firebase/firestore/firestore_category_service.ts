export class FirestoreCategoryService {
  async create(args: { name: string }): Promise<void> {
    console.log('FirestoreCategoryService.create', args)
  }
}
