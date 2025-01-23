export class Baby {
  id: string
  name: string
  birthDate: Date
  createdAt: Date

  constructor(args: {
    id: string
    name: string
    birthDate: Date
    createdAt: Date
  }) {
    const { id, name, birthDate, createdAt } = args
    this.id = id
    this.name = name
    this.birthDate = birthDate
    this.createdAt = createdAt
  }
}
