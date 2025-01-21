import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
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
    } catch (error: any) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
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
    } catch (error: any) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth.signOut()
    } catch (error: any) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.sendPasswordResetEmail(email)
    } catch (error: any) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async sendEmailVerification(): Promise<void> {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new UserNotFoundException()
      } else {
        await sendEmailVerification(currentUser)
      }
    } catch (error: any) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new UserNotFoundException()
      } else {
        await currentUser.reload()

        return currentUser
      }
    } catch (error: any) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async checkEmailVerification(): Promise<boolean> {
    try {
      const currentUser = auth.currentUser

      if (!currentUser) {
        throw new UserNotFoundException()
      } else {
        await currentUser.reload()

        const isEmailVerified = currentUser.emailVerified

        return isEmailVerified
      }
    } catch (error: any) {
      if (isFirebaseError(error)) {
        const result = this.handleFirebaseAuthError(error)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
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
  }
}
