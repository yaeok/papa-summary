export class User {
  id: string
  name: string
  email: string
  parentType: string
  babyId: string
  createdAt: Date

  constructor(args: {
    id: string
    name: string
    email: string
    parentType: string
    babyId: string
    createdAt: Date
  }) {
    const { id, name, email, parentType, babyId, createdAt } = args
    this.id = id
    this.name = name
    this.email = email
    this.parentType = parentType
    this.babyId = babyId
    this.createdAt = createdAt
  }
}
