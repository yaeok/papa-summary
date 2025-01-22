export class UserOutput {
  id: string
  name: string
  email: string
  parentType: string
  createdAt: Date
  updatedAt: Date | null

  constructor(args: {
    id: string
    name: string
    email: string
    parentType: string
    createdAt: Date
    updatedAt: Date | null
  }) {
    const { id, name, email, parentType, createdAt, updatedAt } = args
    this.id = id
    this.name = name
    this.email = email
    this.parentType = parentType
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
