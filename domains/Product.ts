import { Category } from './Category'

export class Product {
  id: string
  name: string
  price: number
  content: string
  categories: Category[]
  createdAt: Date
  updatedAt: Date | null

  constructor(
    id: string,
    name: string,
    price: number,
    content: string,
    categories: Category[],
    createdAt: Date,
    updatedAt: Date | null
  ) {
    this.id = id
    this.name = name
    this.price = price
    this.content = content
    this.categories = categories
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
