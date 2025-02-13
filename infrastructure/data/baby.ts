export class BabyDB {
  private id: string
  private name: string
  private birthDate: Date | null
  private createdAt: Date
  private updatedAt: Date

  constructor() {
    this.id = ''
    this.name = ''
    this.birthDate = null
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  getId(): string {
    return this.id
  }

  setId(id: string): void {
    this.id = id
  }

  getName(): string {
    return this.name
  }

  setName(name: string): void {
    this.name = name
  }

  getBirthDate(): Date | null {
    return this.birthDate
  }

  setBirthDate(birthDate: Date | null): void {
    this.birthDate = birthDate
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt
  }

  getUpdatedAt(): Date {
    return this.updatedAt
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt
  }
}
