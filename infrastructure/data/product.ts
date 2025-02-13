export class ProductDB {
  private id: string
  private name: string
  private price: number
  private content: string
  private babyId: string
  private createdBy: string
  private createdAt: Date

  constructor() {
    this.id = ''
    this.name = ''
    this.price = 0
    this.content = ''
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

  getPrice(): number {
    return this.price
  }

  setPrice(price: number): void {
    this.price = price
  }

  getContent(): string {
    return this.content
  }

  setContent(content: string): void {
    this.content = content
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
