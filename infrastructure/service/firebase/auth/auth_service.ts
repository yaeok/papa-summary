/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthRepository } from '@/domains/repositories/auth_repository'
import { SystemErrorException } from '@/infrastructure/exception/SystemErrorException'
import { UserNotFoundException } from '@/infrastructure/exception/UserNotFoundException'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from '@firebase/auth'

import { auth } from '../config/firebaseConfig'
import { FirebaseAuthException } from '../exception/FirebaseAuthException'
import {
  FirebaseError,
  isFirebaseError,
} from '../exception/types/FirebaseAuthExceptionType'

export class AuthService implements AuthRepository {
  async signUpWithEmail(args: {
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

      await this.sendEmailVerification()

      return userCredential
    } catch (error: unknown) {
      if (isFirebaseError(error as Error)) {
        const result = this.handleFirebaseAuthError(error as FirebaseError)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async signInWithEmail(args: {
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
    } catch (error: unknown) {
      if (isFirebaseError(error as Error)) {
        const result = this.handleFirebaseAuthError(error as FirebaseError)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth.signOut()
    } catch (error: unknown) {
      if (isFirebaseError(error as Error)) {
        const result = this.handleFirebaseAuthError(error as FirebaseError)
        throw new FirebaseAuthException(result.message, result.code)
      } else {
        throw new SystemErrorException()
      }
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error: unknown) {
      if (isFirebaseError(error as Error)) {
        const result = this.handleFirebaseAuthError(error as FirebaseError)
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
    } catch (error: unknown) {
      if (isFirebaseError(error as Error)) {
        const result = this.handleFirebaseAuthError(error as FirebaseError)
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
    } catch (error: unknown) {
      if (isFirebaseError(error as Error)) {
        const result = this.handleFirebaseAuthError(error as FirebaseError)
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
    } catch (error: unknown) {
      if (isFirebaseError(error as Error)) {
        const result = this.handleFirebaseAuthError(error as FirebaseError)
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
  private handleFirebaseAuthError(error: FirebaseError): {
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
