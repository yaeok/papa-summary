export class Category {
  private id: string
  private name: string
  private babyId: string
  private createdBy: string
  private createdAt: Date

  constructor() {
    this.id = ''
    this.name = ''
    this.babyId = ''
    this.createdBy = ''
    this.createdAt = new Date()
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

  getBabyId(): string {
    return this.babyId
  }

  setBabyId(babyId: string): void {
    this.babyId = babyId
  }

  getCreatedBy(): string {
    return this.createdBy
  }

  setCreatedBy(createdBy: string): void {
    this.createdBy = createdBy
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt
  }
}
