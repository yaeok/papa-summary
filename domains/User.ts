export class User {
  id: string
  name: string
  email: string
  parentType: string
  createdAt: Date

  constructor(args: {
    id: string
    name: string
    email: string
    parentType: string
    createdAt: Date
  }) {
    const { id, name, email, parentType, createdAt } = args
    this.id = id
    this.name = name
    this.email = email
    this.parentType = parentType
    this.createdAt = createdAt
  }
}
