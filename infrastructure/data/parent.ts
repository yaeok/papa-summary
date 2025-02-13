export class ParentDB {
  private userId: string
  private babyId: string

  constructor() {
    this.userId = ''
    this.babyId = ''
  }

  getUserId(): string {
    return this.userId
  }

  setUserId(userId: string): void {
    this.userId = userId
  }

  getBabyId(): string {
    return this.babyId
  }

  setBabyId(babyId: string): void {
    this.babyId = babyId
  }
}
