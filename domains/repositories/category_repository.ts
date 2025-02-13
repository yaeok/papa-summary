import { Category } from '@/domains/entities/category'
import { CategoryDB } from '@/infrastructure/data/category'

export interface CategoryRepository {
  create(args: { category: Category }): Promise<string>
  findByUserId(args: { userId: string }): Promise<CategoryDB[]>
}
