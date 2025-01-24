import { Category } from '@/domains/Category'
import { DocumentData } from '@firebase/firestore'

export class CategoryDTO {
  id: string
  name: string
  ownerId: string
  createdAt: Date

  constructor(args: {
    id: string
    name: string
    ownerId: string
    createdAt: Date
  }) {
    const { id, name, ownerId, createdAt } = args
    this.id = id
    this.name = name
    this.ownerId = ownerId
    this.createdAt = createdAt
  }

  static fromDocumentData(data: DocumentData, id: string): CategoryDTO {
    return new CategoryDTO({
      id: id,
      name: data.name,
      ownerId: data.ownerId,
      createdAt: data.createdAt.toDate(),
    })
  }

  static fromCategory(category: Category, userId: string): CategoryDTO {
    return new CategoryDTO({
      id: category.id,
      name: category.name,
      ownerId: userId,
      createdAt: category.createdAt,
    })
  }

  toDocumentData(): DocumentData {
    return {
      name: this.name,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
    }
  }
}
