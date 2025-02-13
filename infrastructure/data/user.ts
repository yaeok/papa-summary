export class UserDB {
  private id: string
  private name: string
  private email: string
  private parentType: number
  private babyId: string
  private createdAt: Date
  private updatedAt: Date

  constructor() {
    this.id = ''
    this.name = ''
    this.email = ''
    this.parentType = 0
    this.babyId = ''
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

  getEmail(): string {
    return this.email
  }

  setEmail(email: string): void {
    this.email = email
  }

  getParentType(): number {
    return this.parentType
  }

  setParentType(parentType: number): void {
    this.parentType = parentType
  }

  getBabyId(): string {
    return this.babyId
  }

  setBabyId(babyId: string): void {
    this.babyId = babyId
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
