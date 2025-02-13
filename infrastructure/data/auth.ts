export class AuthDB {
  private id: string
  private email: string
  private emailVerified: boolean

  constructor() {
    this.id = ''
    this.email = ''
    this.emailVerified = false
  }

  getId(): string {
    return this.id
  }

  setId(id: string): void {
    this.id = id
  }

  getEmail(): string {
    return this.email
  }

  setEmail(email: string): void {
    this.email = email
  }

  getEmailVerified(): boolean {
    return this.emailVerified
  }

  setEmailVerified(emailVerified: boolean): void {
    this.emailVerified = emailVerified
  }
}
