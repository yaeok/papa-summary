import { Category } from './Category'

export class Product {
  id: string
  name: string
  price: number
  content: string
  categories: Category[]
  createdAt: Date

  constructor(args: {
    id: string
    name: string
    price: number
    content: string
    categories: Category[]
    createdAt: Date
  }) {
    const { id, name, price, content, categories, createdAt } = args
    this.id = id
    this.name = name
    this.price = price
    this.content = content
    this.categories = categories
    this.createdAt = createdAt
  }
}
