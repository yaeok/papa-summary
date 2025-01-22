import { User } from '@/domains/User'

import { FirebaseAuthService } from '../service/firebase/auth/firebase_auth_service'

export class AuthRepository {
  private service: FirebaseAuthService

  constructor() {
    this.service = new FirebaseAuthService()
  }
  async signUp(args: { email: string; password: string }): Promise<string> {
    const response = await this.service.signUp(args)
    // firebase authのuidを返す
    return response.user.uid
  }

  async signIn(args: { email: string; password: string }): Promise<string> {
    const response = await this.service.signIn(args)
    // firebase authのuidを返す
    return response.user.uid
  }

  async signOut(): Promise<void> {
    await this.service.signOut()
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await this.service.sendPasswordResetEmail(email)
  }

  async sendEmailVerification(): Promise<void> {
    await this.service.sendEmailVerification()
  }

  async checkEmailVerification(): Promise<boolean> {
    const response = await this.service.checkEmailVerification()

    return response
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.service.getCurrentUser()

    const user = new User({
      id: response.uid,
      name: '',
      email: response.email!,
      parentType: '',
      createdAt: new Date(),
    })

    return user
  }
}
