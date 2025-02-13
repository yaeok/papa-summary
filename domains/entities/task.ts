export class Task {
  private id: string
  private title: string
  private content: string
  private startDate: Date
  private endDate: Date | null
  private babyId: string
  private timing: number
  private completedAt: Date | null
  private createdBy: string
  private createdAt: Date

  constructor() {
    this.id = ''
    this.title = ''
    this.content = ''
    this.startDate = new Date()
    this.endDate = null
    this.babyId = ''
    this.timing = 0
    this.completedAt = null
    this.createdBy = ''
    this.createdAt = new Date()
  }

  getId(): string {
    return this.id
  }

  setId(id: string): void {
    this.id = id
  }

  getTitle(): string {
    return this.title
  }

  setTitle(title: string): void {
    this.title = title
  }

  getContent(): string {
    return this.content
  }

  setContent(content: string): void {
    this.content = content
  }

  getStartDate(): Date {
    return this.startDate
  }

  setStartDate(startDate: Date): void {
    this.startDate = startDate
  }

  getEndDate(): Date | null {
    return this.endDate
  }

  setEndDate(endDate: Date | null): void {
    this.endDate = endDate
  }

  getBabyId(): string {
    return this.babyId
  }

  setBabyId(babyId: string): void {
    this.babyId = babyId
  }

  getTiming(): number {
    return this.timing
  }

  setTiming(timing: number): void {
    this.timing = timing
  }

  getCompletedAt(): Date | null {
    return this.completedAt
  }

  setCompletedAt(completedAt: Date | null): void {
    this.completedAt = completedAt
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
