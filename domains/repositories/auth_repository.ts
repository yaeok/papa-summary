import { User, UserCredential } from '@firebase/auth'

export interface AuthRepository {
  signUpWithEmail(args: {
    email: string
    password: string
  }): Promise<UserCredential>
  signInWithEmail(args: {
    email: string
    password: string
  }): Promise<UserCredential>
  signOut(): Promise<void>

  sendPasswordResetEmail(email: string): Promise<void>
  sendEmailVerification(): Promise<void>
  checkEmailVerification(): Promise<boolean>

  getCurrentUser(): Promise<User>
}
