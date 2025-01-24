import { CategoryDTO } from '@/infrastructure/data/CategoryDTO'

export class Category {
  id: string
  name: string
  createdAt: Date

  constructor(args: { id: string; name: string; createdAt: Date }) {
    const { id, name, createdAt } = args
    this.id = id
    this.name = name
    this.createdAt = createdAt
  }

  static fromCategoryDTO(categoryDTO: CategoryDTO): Category {
    return new Category({
      id: categoryDTO.id,
      name: categoryDTO.name,
      createdAt: categoryDTO.createdAt,
    })
  }
}
