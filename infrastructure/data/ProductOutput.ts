export class ProductOutput {
  id: string
  name: string
  price: number
  content: string
  ownerId: string
  createdAt: Date
  updatedAt: Date | null

  constructor(args: {
    id: string
    name: string
    price: number
    content: string
    ownerId: string
    createdAt: Date
    updatedAt: Date | null
  }) {
    const { id, name, price, content, ownerId, createdAt, updatedAt } = args
    this.id = id
    this.name = name
    this.price = price
    this.content = content
    this.ownerId = ownerId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
