export class Baby {
  private id: string
  private name: string
  private birthDate: Date | null

  constructor() {
    this.id = ''
    this.name = ''
    this.birthDate = null
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
}
