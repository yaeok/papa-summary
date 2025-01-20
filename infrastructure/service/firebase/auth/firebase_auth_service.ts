import { UserNotFoundException } from '@/infrastructure/exception/UserNotFoundException'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from '@firebase/auth'

import { auth } from '../config/firebaseConfig'
import {
  FirebaseAuthException,
  isFirebaseError,
} from '../exception/FirebaseAuthException'

export class FirebaseAuthService {
  async signUp(args: {
    email: string
    password: string
  }): Promise<UserCredential> {
    const { email, password } = args

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      return userCredential
    } catch (error) {
      const result = this.handleFirebaseAuthError(error)
      throw new FirebaseAuthException(result.message, result.code)
    }
  }

  async signIn(args: {
    email: string
    password: string
  }): Promise<UserCredential> {
    const { email, password } = args

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      return userCredential
    } catch (error) {
      const result = this.handleFirebaseAuthError(error)
      throw new FirebaseAuthException(result.message, result.code)
    }
  }

  async signOut(): Promise<void> {
    await auth.signOut()
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    await this.sendPasswordResetEmail(email)
  }

  async sendEmailVerification(): Promise<void> {
    const currentUser = auth.currentUser

    if (!currentUser) {
      throw new UserNotFoundException()
    } else {
      await sendEmailVerification(currentUser)
    }
  }

  async getCurrentUser(): Promise<User> {
    const currentUser = auth.currentUser

    if (!currentUser) {
      throw new UserNotFoundException()
    } else {
      await auth.currentUser?.reload()

      return auth.currentUser!
    }
  }

  async checkEmailVerification(): Promise<boolean> {
    const currentUser = auth.currentUser

    if (!currentUser) {
      throw new UserNotFoundException()
    } else {
      await auth.currentUser?.reload()

      const isEmailVerified = auth.currentUser?.emailVerified

      return isEmailVerified!
    }
  }

  /**
   * Firebaseのエラーハンドリングを行う
   * @param error エラーオブジェクト
   */
  private handleFirebaseAuthError(error: any): {
    message: string
    code: string
  } {
    if (isFirebaseError(error)) {
      let message
      switch (error.code) {
        case 'auth/user-not-found':
          message = '認証情報が見つかりません'
          break
        case 'auth/wrong-password':
          message = 'パスワードが違います'
          break
        case 'auth/user-disabled':
          message = '無効なアカウントです'
          break
        case 'auth/too-many-requests':
          message = 'リクエストが多すぎます。後ほど再試行してください'
          break
        case 'auth/invalid-email':
          message = '無効なメールアドレスです'
          break
        case 'auth/email-already-in-use':
          message = '既に登録されたメールアドレスです'
          break
        default:
          message = 'ログインに失敗しました'
          break
      }
      return {
        message,
        code: error.code,
      }
    } else {
      return {
        message: 'ログインに失敗しました',
        code: 'auth/unknown-error',
      }
    }
  }
}
