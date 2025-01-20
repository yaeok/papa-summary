import { User } from '@/domains/User';

import { FirebaseAuthService } from '../service/firebase/auth/firebase_auth_service';

export class AuthRepository {
  private service: FirebaseAuthService

  constructor() {
    this.service = new FirebaseAuthService()
  }
  async signUp(args: { email: string; password: string }): Promise<User> {
    const response = await this.service.signUp(args)


    const user = new User({
      id: response.user.uid,
      name: response.user.displayName ?? '',
      email: response.user.email ?? '',
      parentType: 'user',
      createdAt: new Date(),
    })

    return user
  }

  async signIn(args: { email: string; password: string }) {
    const response = await this.service.signIn(args)

    if (!response.user) {
      throw new Error('No user is signed in')
    } else {
      const user = new User({
        id: response.user.uid,
        name: response.user.displayName ?? '',
        email: response.user.email ?? '',
        parentType: 'user',
        createdAt: new Date(),
      })

      return user
    }
  }

  async signOut() {}

  async sendPasswordResetEmail(email: string) {}

  async sendEmailVerification() {}

  async checkEmailVerification(): Promise<boolean> {
    const response = await this.service.checkEmailVerification()

    return response
  }
}
